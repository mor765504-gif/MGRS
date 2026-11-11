# MGRS 阅读指南

[仓库首页](../README.md) · [产品与系统总览](MIMI-OVERVIEW.md) · [协议全文](../MGRS.md)

第一次接触秘秘，可以先读[设计理念](000-philosophy.md)，再读[执行与证据](004-execution-and-evidence.md)。前一篇解释为什么一个长期帮人做事的助手需要治理，后一篇跟着一份研究简报，看这些设计如何应对分工、改要求和中断。

## 按问题阅读

| 想弄清的问题 | 对应章节 |
| --- | --- |
| 两个 Agent 都做完了各自的事，为什么参会者还会收到旧纪要？ | [000 · 设计理念](000-philosophy.md) |
| 用户一直在说同一件事，系统为什么还要区分任务、尝试和结果？ | [001 · 核心对象](001-domain-model.md) |
| 从用户入口到工坊，谁查权限、谁调工具、谁保存结果？ | [002 · 架构与职责](002-architecture.md) |
| 用户改了要求，下一轮怎样用上新要求，还能找到先前的材料？ | [003 · 上下文、记忆与 Persona](003-context-and-memory.md) |
| 交接之后怎样验收？工具超时以后怎样接着做？ | [004 · 执行与证据](004-execution-and-evidence.md) |
| 有哪些证据能说明一个环节确实工作了？怎样衡量整件事？ | [005 · 审查与符合性](005-review-and-conformance.md) |
| 做研究时，秘秘怎样从搜索结果追到足以支持结论的原件？ | [006 · 秘秘自研搜索策略](006-search-strategy.md) |

## 讨论规则或查看依据

逐条讨论协议时，可以从[十四条治理不变量](../MGRS.md#mgrs-3)进入。[设计决定](DECISIONS.md)说明一项取舍已有何种共识，[待商榷事项](OPEN-QUESTIONS.md)列出还有哪些具体边界要定。[参与讨论](../CONTRIBUTING.md)

想追溯设计的来历，可以看[作者的公开答疑](sources/2026-11-09-bilibili-bv1vix26sEzR.md)和[抽屉与九项架构研究](RESEARCH.md)。想深入秘秘实现，可以按问题查[宿主与搜索策略](sources/2026-11-09-system-baseline.md)、[组件接线与运行记录](sources/2026-11-11-integration.md)，或[早期长对话与缓存实验](sources/2026-11-12-context-evaluation-baseline.md)。每份记录都给出了当时采用的版本和观察条件。

[原稿与来源](PROVENANCE.md) · [逐字归档](../archive/README.md) · [变更记录](../CHANGELOG.md) · [仓库维护](PUBLISH.md)
