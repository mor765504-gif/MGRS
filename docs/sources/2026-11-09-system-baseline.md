# 2026-11-09 · 产品总览的工程与来源基线

[首页](../../README.md) · [产品与系统总览](../MIMI-OVERVIEW.md) · [自研搜索策略](../006-search-strategy.md) · [来源说明](../PROVENANCE.md)

核查日期：**2026-11-09**。本页日期与合并时间使用**北京时间（UTC+8）**。MGRS 本次编辑起点为 `3ed99d762545ae446912c8669717eadc97229f94`。

本次读取 GitHub PR 元数据、固定提交源码、已有 Actions 运行状态与四个 Job 日志，以及所列英文官方资料。历史搜索试用取自已有记录，未重新运行产品测试、调用产品模型、访问生产宿主或读取私有原始会话。

产品哲学、三层定位、商业模式及自研搜索策略归属来自项目作者本次提供并确认的全文。源码和日志用于核对具体实现与证据范围，不将作者确认的产品目标改写为已验收功能。

<a id="source-prs"></a>

## 1. PR 与候选状态

| 对象 | 本次实际读取的状态 | 固定版本与范围 |
| :--- | :--- | :--- |
| [Mimi-Superagent PR #12](https://github.com/mor765504-gif/Mimi-Superagent/pull/12) | Open / Draft | head `1dd86db66894ecabcd518be1e5cb1aac8d9fc462`；目标为 `main`，读取时 base `dd9ae5c0720f8db78ac953ac99a770295de844d6` |
| [Mimi-Superagent PR #14](https://github.com/mor765504-gif/Mimi-Superagent/pull/14) | Open / Draft | 设计文档 head `ad62b7f1301fa96474c160a7e58d2188785d7311`；不是已合并实现 |
| [Mimi-Superagent PR #15](https://github.com/mor765504-gif/Mimi-Superagent/pull/15) | Closed / Merged | 2026-11-08 21:27:11 合入 `release/mimi-rc-20261105`；最终 head `dcda9e111727855f9c5eefec82c3089a03d8217c`，merge `1dd86db66894ecabcd518be1e5cb1aac8d9fc462` |
| [assisthub PR #453](https://github.com/mor765504-gif/assisthub/pull/453) | Closed / Merged | 2026-11-03 02:58:08 合入实验仓 `main`；merge `90d1adc2e885c0a6f62f27a57f31347ccaca0320` |

PR #15 的交付记录明确说明未更新产品 main、未部署或正式发布。本次没有另做生产部署核验。PR #14 即使返回临时合并对象信息，也不能据此称其已合并；状态应依据 `merged` 与实际合并记录。

### 执行网关的既有 CI

[Execution gateway，run 42416426070](https://github.com/mor765504-gif/Mimi-Superagent/actions/runs/42416426070) 为 success。本次读取的三个 Job 日志均 checkout 临时合并对象 `94b26406104fe4f0ab811e096ee6551d2a96fb2f`，对应 PR 最终 head 与合并前 base 的组合。

| Job | 环境 | 日志结果 |
| :--- | :--- | :--- |
| [128535402010](https://github.com/mor765504-gif/Mimi-Superagent/actions/runs/42416426070/job/128535402010) | Ubuntu / Python 3.13 | 102 passed，5 skipped，4 subtests passed |
| [128535402270](https://github.com/mor765504-gif/Mimi-Superagent/actions/runs/42416426070/job/128535402270) | macOS ARM64 / Python 3.13.17 | 102 passed，5 skipped，4 subtests passed |
| [128535402360](https://github.com/mor765504-gif/Mimi-Superagent/actions/runs/42416426070/job/128535402360) | Ubuntu / Python 3.11 | 102 passed，5 skipped，4 subtests passed |

[Paired source checks，run 42416426062](https://github.com/mor765504-gif/Mimi-Superagent/actions/runs/42416426062) 为 success；[Job 128536427230](https://github.com/mor765504-gif/Mimi-Superagent/actions/runs/42416426062/job/128536427230) 日志中 MCP node、projection、support、groups、authority、join、conversation、meetings、collect 九阶段通过，HTTP boundary 标为 `EXTERNAL_PROTOCOL_FIXTURES`、`production_verified=false`。

这是复读已有日志，不是本次新运行测试。五项跳过不计为通过；当前检查成功不倒推出旧 join 失败的根因已定位。真实供应商 CLI 版本与账号、OS 级沙箱、全部 terminal/MCP 路径、新管理页面及 24 小时宿主运行仍按 [PR #15](https://github.com/mor765504-gif/Mimi-Superagent/pull/15)和[实施记录](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/docs/plans/2026-11-07-execution-gateway.md)所列范围继续验证。

<a id="source-search"></a>

## 2. 秘秘自研搜索策略

自研归属来自作者本次明确纠正。以下文件位于产品候选 `1dd86db66894ecabcd518be1e5cb1aac8d9fc462`，可以支持具体策略内容、代码存在及接入形式的判断。

| 固定来源 | 本次读取内容 |
| :--- | :--- |
| [policy.md](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_search_strategy/policy.md) | “秘秘搜索策略 v1”；触发、查询、地区与语言、原文阅读、来源判断、追查、停止与引用规则 |
| [__init__.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_search_strategy/__init__.py) | `register(ctx)` 注册 `pre_llm_call`，返回本轮 `context`；最多两个来源导航，本地匹配，无独立网络 I/O、provider 选择或模型调用 |
| [source_guides.json](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_search_strategy/source_guides.json) | 六类可选来源导航；域名是来源线索，不是访问授权或真实性证明 |
| [plugin.yaml](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_search_strategy/plugin.yaml) | 插件版本 `0.1.0`，声明原生 hook |
| [mimi_product_runtime.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/mimi_cli/mimi_product_runtime.py) | 有搜索插件的检查、复制及 `plugins.enabled` 追加装配路径 |
| [插件 README](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_search_strategy/README.md) | 设计、接入和历史安装/试用记录；本次按记录的原范围使用 |

`policy.md`、`__init__.py`、`source_guides.json`、`plugin.yaml` 四个运行文件，已逐个比对当前候选与实验仓实测实现基线 `c6f79ed132631fc53a99f565ff0fb108162038af`，Git blob 相同。

历史 README 记录了 2026-11-02 的两种不同结果：CLI 的真实请求注入成功，但工具调用被既有入口守卫拒绝；随后获授权的原生桌面后台单题记录了策略输入、两次搜索、两次原文提取和最终回答。2026-11-03 后续记录包含生产重启后的插件启用配置读回。

本次没有读取这些记录对应的私有原始会话，也没有重复试用。可以保留已有链路记录，不能据此扩大为全部题型、GUI 点击、生产 gateway 每条请求或整体搜索质量提升的验收。

<a id="source-runtime"></a>

## 3. 宿主、记忆、Persona 与执行端口

以下观察同样固定在产品候选 `1dd86db6`。源码观察说明相应构件与逻辑存在，运行表现仍需对应环境证据。

| 主题 | 固定源码 | 实际观察 |
| :--- | :--- | :--- |
| 记忆投影 | [mimi_memory/provider.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_memory/provider.py) | `_rebuild_prompt()` 按配置的 `read_scopes` 顺序遍历，各 scope 内按 `subject_key` 排序；Python `len()` 控制含 header 的 2000 字符，放不下的条目跳过后继续；没有基于本轮 query 排名 |
| Character Card | [mimi_tavern/card.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_tavern/card.py) | V2/V3 导入、`CharacterCard`、`LoreEntry` |
| Persona Bundle | [runtime.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_tavern/runtime.py) | card、overlay、runtime、revision 与当轮 `select()` 装配 |
| 条件与示例 | [lorebook.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_tavern/lorebook.py) | 条件、关键词和时间规则；依据条件选择示例 |
| 会话侧状态 | [state.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_tavern/state.py) | `SessionPersonaState` 的保存与恢复 |
| 请求编译 | [compiler.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_tavern/compiler.py) | 插槽、预算与 `compile_request()` |
| 原生压缩继承 | [engine.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_tavern/engine.py) | `MimiContextEngine(ContextCompressor)` 读取配置并调用父类构造，保留 Persona 侧状态 |
| 人格准备 | [mimi_context_features.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/mimi_cli/mimi_context_features.py) | `prepare_profiles()` 使用 `org_sync/templates/` 的中性模板；已有不同内容触发 `persona_local_changes`，不静默覆盖 |
| 执行合同 | [execution_port.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_orchestration/execution_port.py) | `ExecutionPort`、类型化 `ProcessProfile` 与结构化结果解析 |
| 任务执行路由 | [executor_router.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_orchestration/executor_router.py) | 复用原 Store 与持久 binding；任务 backend 为 `hermes` / `process`，默认 `hermes` |
| 网关与宿主接入 | [gateway.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_orchestration/gateway.py)、[mimi_execution.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/mimi_cli/mimi_execution.py) | native/process adapter 接入同一 Runtime；配置区分 `processes` 与 `inference`，缺少私有配置时保持 native-only |
| 受限推理端口 | [inference_port.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/1dd86db66894ecabcd518be1e5cb1aac8d9fc462/backend/deploy/hermes/plugins/mimi_orchestration/inference_port.py) | `AgyInferencePort` 提供 `infer_once`，经独立 inference ports 注册；不是 Router 的第三种完整 Agent 任务后端 |

Core、原生编排、Skill P6 及历史交付的其余既有依据仍见[原研究记录](../RESEARCH.md)与[规范第 16 章](../../MGRS.md#mgrs-16)。本次没有把整个产品源码逐行重审，也没有将当前插件源码观察扩大为所有端到端能力通过。

<a id="source-privacy"></a>

## 4. 机密计算的英文官方来源

| 来源 | 本次实际查阅范围与支持的判断 |
| :--- | :--- |
| [Apple Platform Security，August 2026](https://help.apple.com/pdf/security/en_US/apple-platform-security-guide.pdf) | 阅读 Secure Enclave 相关部分，印刷页 10 至 11。文档描述与主处理器隔离的安全子系统，以及专用 DRAM 区域的保护。由其保护范围推论：普通 Mac 配有 Secure Enclave 本身，不足以证明通用 MLX 推理内存对宿主管理员隔离；这不是 Apple 对 MLX 的原文结论 |
| [Apple：Private Cloud Compute](https://security.apple.com/blog/private-cloud-compute/) | 2024-06-10 技术说明。Apple Silicon 版 PCC 结合专用服务器、强化系统、受限运维、请求加密、节点验证和代码透明机制 |
| [Apple：Expanding Private Cloud Compute](https://security.apple.com/blog/expanding-pcc/) | 2026-06-08 更新。Apple 宣布扩展到 Google Cloud / NVIDIA；不能把 PCC 的全部实现限定为 Apple Silicon 服务器 |
| [Google：Confidential G4 is GA](https://cloud.google.com/blog/topics/ai-infrastructure/confidential-g4-gpus-are-ga/) | 官方公告日期 2026-10-21；使用 NVIDIA RTX PRO 6000 Blackwell Server Edition GPU，宣布 Confidential G4 正式可用，并描述硬件隔离、远程证明与内存加密 |
| [Google：Create a Confidential VM instance with GPU](https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance-with-gpu) | 读取当前支持说明与创建示例：G4 / RTX PRO 6000 / AMD SEV，示例机型 `g4-standard-48`。不能扩写成所有同系列显卡、6000D 或任意多卡配置均获得同样支持 |

平台声明与秘秘自身实现分开使用。总览将这些材料作为可选技术路线的依据，秘秘的客户端加密、证明校验、密钥释放、推理、日志与工具调用链仍需自身的端到端验证。Google 同一公告将 Confidential Space 的后续发布单独表述，本页没有把它与 G4 的 GA 状态合并。

## 5. 编辑与更新口径

上述链接固定源码版本或指向具名 PR、Job 与官方资料。后续状态变化应新增带日期的核查说明，保留历史证据的实际范围。资料无法公开访问时，链接仅提供来源定位；本页不发布原始私有会话、配置凭据、生产网络地址或完整个人 Persona。
