# 002 · 架构与职责：协议怎样落在现有组件上

[首页](../README.md) · [导读目录](README.md) · [完整规范](../MGRS.md)

MGRS 把治理要求落到秘秘已有组件的交界处：事实由谁维护，上下文怎样选取，任务怎样运行，结果怎样验收。读这套架构时，先找每项事实的权威写入方，再看其他组件如何读取和呈现它。

本页是对 0.1 设计候选的说明。图中的关系表达协议职责，不表示这些链路已在当前产品全部接通或完成实测。规范依据是[六个治理面](../MGRS.md#mgrs-2)、[上下文合同](../MGRS.md#mgrs-4)与[单宿主恢复](../MGRS.md#mgrs-11)。

产品组织以 Mimi 自有宿主 ProductRuntime 为根：它装配运行组件与生命周期，Hermes 提供复用的原生执行循环，MGRS 横向规定职责合同。包括统一执行网关、外部软件与推理路径的完整关系，见[产品与系统总览](MIMI-OVERVIEW.md)。

## 2026-11-11 的源码调用与所有权

本节核查产品组合候选 `77c853f1`，包含基线 `1dd86db6`、PR #17 `2ef4555d` 与 PR #19 `1682f28d`。组合候选尚未接受、合并或部署。下图表达源码接线，运行验证按[本次来源与限制](sources/2026-11-11-integration.md)单独记录。后文原协议职责图和 11 月 9 日记录保留各自日期与范围。

```mermaid
flowchart TD
    Host["ProductRuntime 生命周期"] --> Core["同一个 Core 与 P6 发布权威"]
    Host --> Runner["Hermes runner 与原生 Agent Loop"]
    Host --> UI["Workshop 与 UI 服务"]
    Core --> Memory["mimi_memory 只读事实投影"]
    Core --> Skills["mimi_skills 已批准内容读取"]
    Memory --> Runner
    Skills --> Runner
    Persona["mimi_tavern Persona 编译"] --> Runner
    Runner --> Gateway["GatewayService 与 HostPolicy"]
    Gateway --> Runtime["Runtime 任务与 attempt"]
    Runtime --> Router["ExecutorRouter"]
    Router --> Native["NativeExecutor 与 HermesNativeBridge"]
    Router --> Process["NativeExecutor 与 ProcessBridge"]
    Runtime <--> DB["原 SessionDB 连接上的 Store"]
    Native --> DB
    Process --> DB
    DB --> UI
```

`ProductRuntime.start()` 先准备受管 Skill 视图与 Profile，把 `release_factory` 传给 `CoreServer`，再将 Skill runtime 绑定到这个 Core 的 release service。宿主装配原生 runner、执行目录和 Workshop 服务，关闭时依次清理 UI/连接、enterprise、kernel、Skill、事件循环、MCP、调用宿主和 Core。这里描述源码顺序，关闭期间出错仍需专项恢复证据。

`start_gateway()` 从现有 SessionDB 取得连接与锁，获取 Store writer epoch，装配 Runtime、NativeExecutor、InputAdapter 和 Router，恢复已接受 scope、重放原生事件后启动 Runtime。任务调度写入现有 Store 表，原生 journal 保存执行与请求事实。具体入口见[固定源码索引](sources/2026-11-11-integration.md)。

```mermaid
sequenceDiagram
    participant H as ProductRuntime 与 runner
    participant G as GatewayService / HostPolicy
    participant R as Runtime / Store
    participant E as ExecutorRouter
    participant N as 原生或 process adapter
    H->>G: start_gateway 与 scope 恢复
    G->>R: writer epoch、事件重放、start
    H->>G: 当前 turn 中的受管任务工具调用
    G->>G: 身份、scope、操作授权检查
    G->>R: command 与幂等 request_id
    R->>R: 持久 task、basis、attempt、action
    R->>E: ensure_started(attempt_id, basis, binding)
    E->>N: 按持久 backend binding 路由
    N-->>R: binding、执行事件与原生回执
    R-->>G: 状态与结果投影
```

| 事实 | 源码所有者与写入边界 |
| --- | --- |
| 有效记忆、授权与撤回 | Core；provider 读取当前快照，显式记忆工具调用 Core 写入口 |
| Persona 与本轮编译 | `mimi_tavern` 的 bundle、session side state 与编译报告 |
| 已批准 Skill 的发布头与可读内容 | 同一个 Core 的 P6；原生工具读取受管视图并重新检查 |
| 任务版本、依赖、attempt 与准入 | Orchestration Runtime 和原 SessionDB 上的 Store |
| 执行与请求事实 | NativeExecutor journal、bridge 和 InputAdapter；UI 读取投影 |
| 产物接受与交付 | 具名 result verifier、Workshop 和相应产物/外部效果回执 |

Hermes 是默认任务后端。process 需要显式配置和当前授权，必需输入尚无消费支持时在资源预留前等待能力。受限 `AgyInferencePort.infer_once` 经独立 inference ports 注册，调用与授权入口和完整任务执行分开。自研搜索策略仍通过 `pre_llm_call` 注入方法上下文，底层检索走原生工具。以上接线支持对应源码观察，MGRS 完整符合性仍逐条验收。

## 一次任务跨过哪些职责

```mermaid
flowchart TD
    Core["Core 有效事实"] -->|只读选取| Memory["mimi_memory 抽屉投影"]
    Memory -->|相关事实| Hermes["Hermes 原生执行"]
    Persona["mimi_tavern 人格装配"] -->|Persona| Hermes
    Tasks["Orchestration 受管任务"] -->|任务要求与依赖| Hermes
    Hermes -->|原生结果与回执| Evidence["可核对执行记录"]
    Evidence -->|验收依据| Workshop["Workshop 验收与交付"]
    Tasks -->|当前任务版本| Workshop
```

箭头表示信息或职责关系，不是新增的服务、消息队列或数据库。上下文预算、去重和最终校验的装配边界仍有待商榷，见[Q03、Q04](OPEN-QUESTIONS.md)。图中也没有画出所有控制路径；可信宿主身份和当前授权约束贯穿读取、调用、交接与交付。

**Core** 保持有效业务事实及其作用域、版本和撤回状态。**mimi_memory** 从可读快照选出本轮需要的事实；抽屉、压缩摘要和外置阅读文件都属于派生视图。要改权威事实，仍走已有写入与撤回入口。

**mimi_tavern** 负责 Persona 版本和表达上下文的装配。**Hermes** 继续承担原生 Agent Loop、MCP、Skill 加载和会话压缩。**mimi_orchestration** 处理受管任务的依赖、版本化输入和运行状态，Worker 的执行仍依托原生机制。

**Workshop** 组织结果收取、验收和交付边界，交付还要使用原有产物或外发服务及其回执。**ProductRuntime** 负责组件装配与关闭顺序；它的生命周期职责覆盖运行组件，因此没有被画成又一个任务处理步骤。详细约束分别见[第 4 章](../MGRS.md#mgrs-4)、[第 5 章](../MGRS.md#mgrs-5)与[第 11 章](../MGRS.md#mgrs-11)。

## 六个治理面怎样对应组件

| 治理面 | 关心的问题 | 主要权威或承载组件 |
| :--- | :--- | :--- |
| 身份与授权 | 谁可以对什么执行操作？ | 可信宿主、Core 现有授权、Profile、approval |
| 上下文 | 这轮实际拿到了哪些有效信息？ | Core、mimi_memory、mimi_tavern、Hermes 会话与压缩 |
| 执行 | 当前任务由哪次尝试推进？ | Hermes 原生执行、受管任务 Orchestration |
| 证据 | 哪些事实能够证明执行和结果？ | 原生 session/input/attempt/result/receipt、Core 结果、产物 |
| 交付 | 谁接收了什么，是否满足结果条件？ | Workshop、原有产物与外发服务、授权接收回执 |
| 观察 | 中断后怎样判断状态并恢复？ | ProductRuntime、原生状态、现有日志和验收入口 |

“唯一权威”按事实划分，不要求所有数据放进同一个物理数据库。例如任务版本由任务系统维护，材料的授权由相应业务权威判断，UI 读取这些状态来展示。前端显示“完成”不能反过来改写执行回执，另存一个进度摘要也不能取代任务事实。参见[第 2 章](../MGRS.md#mgrs-2)与[界面契约](../MGRS.md#mgrs-12)。

## 从文档到源码时看哪里

以下路径来自规范第 16 章的历史研究记录，属于 **Mimi 产品仓库**，不是本协议仓的本地目录。原稿产品研究基线为 `a8c5bd8a860888e3fa082d3178f9c6f9c534716f`，Hermes 基线为 `c07501ec411b5364e5b12b7258c25a6a4c758545`。该表保留历史入口；2026-11-11 实际重读的候选路径与范围见本页新增章节及来源索引。

| 核查主题 | 原记录中的入口 |
| :--- | :--- |
| Core 记忆与投影 | `backend/core/assisthub_core/context.py`；`backend/deploy/hermes/plugins/mimi_memory/provider.py` |
| 任务、输入与原生执行衔接 | `backend/deploy/hermes/plugins/mimi_orchestration/` 下的 `runtime.py`、`gateway.py`、`input_adapter.py` |
| Persona | `backend/deploy/hermes/plugins/mimi_tavern/` |
| Skill 批准与发布 | `backend/core/assisthub_core/skills_release/README.md` |
| 管理界面与 MCP 验证记录 | `docs/guide/FRONTEND-INVENTORY.md`；`docs/plans/2026-11-04-mcp-lifecycle/VALIDATION.md` |
| 宿主生命周期 | `backend/deploy/mimi_cli/mimi_product_runtime.py` |

核查实现时，应固定实际源码版本并确认装配、配置和执行证据。某个模块出现在源码中，只能支持对应范围的源码判断；是否被加载、是否能完成真实任务，需要相应验证记录。历史已有能力与待证边界见[第 16 章](../MGRS.md#mgrs-16)，分期路线见[第 14 章](../MGRS.md#mgrs-14)。

## 历史记录 · 2026-11-09 候选中的执行网关与自研搜索

PR #15 已合入 PR #12 的候选分支，当时固定 head 为 `1dd86db66894ecabcd518be1e5cb1aac8d9fc462`。`ExecutionPort` / `ExecutorRouter` 在既有任务、attempt、SessionDB 与回执体系中连接 Hermes 和受管子进程两类任务后端；受限 AGY `infer_once` 是单独注册的推理端口。详见[当前源码入口与 CI](sources/2026-11-09-system-baseline.md#source-runtime)。

同一候选包含 `mimi_search_strategy` 的策略文件、hook 和宿主装配入口。它把秘秘自研搜索方法送入当前模型，工具执行沿用原生搜索与提取能力，详见[自研搜索策略](006-search-strategy.md)。

[上一章：核心概念](001-domain-model.md) · [下一章：上下文与记忆](003-context-and-memory.md)
