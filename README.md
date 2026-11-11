# MGRS

**Mimi Governed Runtime Standard · 秘秘专有 Agent 治理协议**

让多 Agent 的协作有明确边界，交接有可追溯的依据，完成有实际回执。

[产品与系统总览](docs/MIMI-OVERVIEW.md) · [设计理念](docs/000-philosophy.md) · [架构关系](docs/002-architecture.md) · [自研搜索策略](docs/006-search-strategy.md) · [完整规范](MGRS.md)

**协议版本：0.1，设计候选。** 本仓库公开保存规范、研究记录和技术讨论材料，首先服务于秘秘内部，并允许外部开发者参与讨论与审查。实现和验证的范围见[当前状态与证据](docs/005-review-and-conformance.md)，许可说明见 [NOTICE.md](NOTICE.md)。

## 产品、实现与协议

秘秘希望让 AI 持续参与个人与组织的工作，让用户保有对数据、模型、工具和计算资源的选择权。完整介绍见[《秘秘 Mimi：产品哲学、系统架构与 MGRS 治理协议》](docs/MIMI-OVERVIEW.md)，其中包含十二个部分和四张架构图。

| 对象 | 承担的职责 |
| :--- | :--- |
| **Mimi 产品** | 面向个人与企业的持续运行 AI 工作空间，提供交互、记忆、任务执行、跨软件协作和结果交付 |
| **Mimi Harness** | 以自有宿主集成 Hermes、Core、Persona、Memory、MCP、Skill、工坊、自研搜索策略与统一执行网关 |
| **MGRS 治理协议** | 约束各组件和 Agent 的可观察行为、权限、版本、交接、实际效果、验收与恢复 |

MGRS 允许 Agent 自主选择方法，不强制规定模型内部的思考过程、规划顺序或模型架构。**Agent 的自主性体现于选择方法；治理的约束体现于权限、事实、责任和效果。**

## MGRS 是什么

MGRS 关心一件具体的事：当 Agent 开始长期记住事情、拆任务、调用工具、把工作交给其他 Agent，并在中断后继续执行时，怎样让整件事始终对得上用户的目标、权限和真实结果。

谁能读哪份资料？Worker 能继承多少权限？用户中途改了要求，旧结果还能不能用？一个 Agent 说“完成了”，后继 Agent 有没有真正收到、读到并用对？MGRS 把这些问题写成可以讨论、实现和检查的运行时合同。

底座继续沿用 Hermes 的 Agent Loop、MCP、Skill、心跳和会话机制；Core 管业务事实与授权，抽屉整理本轮上下文，Persona 管人格和表达，Orchestration 与工坊负责受管任务、结果验收和交付。协议说明这些组件怎样配合，以及每项事实由谁负责。详见[架构关系](docs/002-architecture.md)。

## 为什么要讨论治理

多 Agent 分工以后，困难会出现在组件之间：任务已启动，结果却没有送到正确的会话；新要求已经保存，实际模型请求仍使用旧版；工具超时了，外部操作可能已经成功。每个局部看起来都在工作，最终交付却未必可靠。

MGRS 从这些实际边界组织规范：

| 需要讲清的问题 | 协议中的处理方式 | 阅读位置 |
| :--- | :--- | :--- |
| 谁有权读、写和执行 | 由可信宿主绑定身份、Profile、scope 和当前授权；Worker 按任务获得有限能力 | [核心对象](docs/001-domain-model.md) |
| 这一轮究竟需要哪些信息 | 从现有权威来源生成只读上下文视图，保留来源、版本和遗漏原因 | [上下文与记忆](docs/003-context-and-memory.md) |
| 团队交接是否真正有效 | 结果绑定任务版本，分别记录持久化、路由、请求消费和验收 | [执行与证据](docs/004-execution-and-evidence.md) |
| 失败后怎样继续 | 恢复原任务和旧 attempt，对账未知效果，再决定后续动作 | [规范第 11 章](MGRS.md#mgrs-11) |
| 怎样判断改造有价值 | 同时观察准确性、延迟、用量与成本、任务可靠性，保留失败样本和测试条件 | [审查与符合性](docs/005-review-and-conformance.md) |

治理的开销也要算进去。普通聊天和小任务可以直接推进；复杂依赖和高风险效果才需要相应的合同、复核与恢复检查。在已有授权的有效范围内继续推进，避免机械重复确认。这个原则写在 [G12](MGRS.md#mgrs-3) 与[任务纪律](MGRS.md#mgrs-6)中。

## 秘秘自研搜索策略

秘秘的搜索策略由项目作者自主设计，覆盖什么时候搜索、怎样构造查询、如何读取原件、判断来源、按缺口追查，以及何时停止和引用。它通过 `mimi_search_strategy` 插件与 `pre_llm_call` 接入当前模型，复用 Hermes 原生 `web_search` / `web_extract` 执行检索和提取。

查询语言与来源选择是这套自研策略的一部分。方法层的设计归属和底层 provider 的执行职责分别说明，详见[自研搜索策略](docs/006-search-strategy.md)。当前候选已有策略源码、宿主装配入口和既有单题链路记录，范围见[核验索引](docs/sources/2026-11-09-system-baseline.md#source-search)。

## 用一个任务理解它

假设用户交代：“根据这些材料整理一份研究简报，保留引用，先交草稿。”

主控明确目标和允许使用的材料，按需要拆分资料整理与复核任务。每个 Worker 获得与任务相关的上下文和权限，返回带版本、证据引用和未解决问题的结果。接收方检查它对应的要求，再根据原件与约定的检查接受结果。

如果用户后来要求缩小研究范围，任务要求就有了新版本。旧结果仍归原版本，不满足新版本要求；相关下游依据失效并等待确认，不能悄悄重绑依赖。如果草稿已经生成，系统应据实记录产物；外部发送则另看授权与实际回执。主控可以解释进度，完成状态要有对应事实。

[完整示例](docs/004-execution-and-evidence.md)把这条过程展开到任务版本、结果交接和未知效果恢复。示例用于解释协议，不是产品实测报告。

## 从哪里开始读

编号导读按“理念 → 对象 → 架构 → 上下文 → 执行 → 审查”展开，并以 006 单独说明自研搜索策略。它们解释规范与具体方法；条款正文集中在 [MGRS.md](MGRS.md)。

| 文档 | 读完能理解什么 |
| :--- | :--- |
| [000 · 设计理念](docs/000-philosophy.md) | 为什么关注事实权威、真实交接和与任务相称的治理成本 |
| [001 · 核心对象](docs/001-domain-model.md) | 身份、Profile、会话、任务、attempt、结果和回执分别指什么 |
| [002 · 架构关系](docs/002-architecture.md) | Core、Hermes、Memory、Persona、Orchestration 和工坊怎样分工 |
| [003 · 上下文与记忆](docs/003-context-and-memory.md) | 抽屉如何选择信息，权限、缓存、压缩和冷启动如何衔接 |
| [004 · 执行与证据](docs/004-execution-and-evidence.md) | 一个任务如何分工、接受修正、交接结果和处理未知效果 |
| [005 · 审查与符合性](docs/005-review-and-conformance.md) | 怎样区分协议要求、源码记录、测试证据和当前待决问题 |
| [006 · 秘秘自研搜索策略](docs/006-search-strategy.md) | 自研方法怎样组织查询、阅读、追查与证据判断，并接入原生工具循环 |

需要快速定位某个问题，可以直接看[文档导航](docs/README.md)。要逐条审查协议，阅读 [16 章完整规范](MGRS.md)、[决定记录](docs/DECISIONS.md)与[待商榷事项](docs/OPEN-QUESTIONS.md)。技术依据与原有取舍保存在[研究全文](docs/RESEARCH.md)。

## 当前状态

2026-11-11 新增[组合源码接线与实际验证范围](docs/sources/2026-11-11-integration.md)，更新架构、上下文、执行恢复与部署图。原日期记录保持历史范围；组合候选仍未部署，完整产品接受尚未完成。

| 内容 | 状态与适用范围 |
| :--- | :--- |
| 完整规范 | 0.1 设计候选，包含 16 章、14 条治理不变量，以及 ContextEnvelope / ResultCapsule 的拟议结构 |
| 导读与讨论 | 本仓库提供可编辑 Markdown、任务示例、决定记录、开放问题和来源索引 |
| 研究与原稿 | 保留 2026-11-07 的固定研究基线及逐字归档，历史判断按原范围阅读 |
| 产品实施与符合性 | 需要逐项关联源码版本、配置与执行证据；文档合并不代表对应能力通过验收 |

**2026-11-09 工程核查：** 产品集成候选 [PR #12](https://github.com/mor765504-gif/Mimi-Superagent/pull/12) 仍为 Open / Draft，head 为 `1dd86db6`；统一执行网关 [PR #15](https://github.com/mor765504-gif/Mimi-Superagent/pull/15) 已合入该候选分支；自研搜索策略 [PR #453](https://github.com/mor765504-gif/assisthub/pull/453) 已合入实验仓，当前产品候选也包含它。固定提交、已有 CI 和运行记录的范围见[工程基线](docs/sources/2026-11-09-system-baseline.md)。

抽屉收益、复杂任务的语义交接、完整单宿主长运行、零访问加密推理等，仍按各自的具体证据判断。约 2C4G 的宿主体量是设计目标；2000 字符是事实视图的首版预算，两者都不能当成实测容量或性能结论。具体边界见[审查指南](docs/005-review-and-conformance.md)。

**历史调参证据（2026-09-26）：** AssistHub 曾结合论文、用量对账与受控真实模型回放选择并部署 High/160K 压缩参数，记录了 71.8%/84.9% 的两组缓存命中率与历史线上约 96% 的独立样本；原生记忆额度为 10000/6000 字符，**不同于后续 2000 字符的 Core 事实投影**。具体分母、失败样本和新旧版本边界见[历史评测摘要](docs/sources/2026-11-12-context-evaluation-baseline.md)。

## 参与讨论和维护

欢迎围绕明确条款、失效场景和替代方案提出 [Issue](https://github.com/mor765504-gif/MGRS/issues) 或 [Pull Request](https://github.com/mor765504-gif/MGRS/pulls)。请说明问题落在哪个章节、怎样影响用户目标或实际结果，以及有哪些证据。涉及仍未决定的权限与验收边界，保留讨论状态。

编辑入口和建议格式见 [CONTRIBUTING.md](CONTRIBUTING.md)。规范正文聚焦技术治理；产品哲学、部署选择、个人与企业路径以及商业模式在[总览](docs/MIMI-OVERVIEW.md)中说明，帮助理解协议的适用场景。

在已有克隆目录中运行文档检查，只需 Python 3：

```sh
python3 scripts/verify_archive.py
```

该命令离线检查原稿校验值、规范结构、Markdown 本地链接与锚点、规范中的 JSON 示例和发布清单。它不执行秘秘产品测试。[日常维护说明](docs/PUBLISH.md)介绍修改后的检查方式。

## 来源与许可

原稿来源为 [Mimi-Superagent PR #14](https://github.com/mor765504-gif/Mimi-Superagent/pull/14) 的固定文档提交 `ad62b7f1301fa96474c160a7e58d2188785d7311`。公开仓库内的[逐字归档](archive/README.md)可直接阅读；来源、历史基线和后续编辑记录见 [PROVENANCE.md](docs/PROVENANCE.md) 与 [CHANGELOG.md](CHANGELOG.md)。

文档的首页入口与编号导读形式参考了 [DSH 的 README](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/README.md)。MGRS 的协议内容、组件职责和状态说明以本仓库为准。

本项目保持“秘秘内部专有治理协议、公开技术讨论”的定位。许可、再分发和实施条件见 [NOTICE.md](NOTICE.md)。
