# 原稿与来源

[阅读指南](README.md) · [协议索引](../MGRS.md) · [逐字归档](../archive/README.md)

## 最初的两份原稿

2026 年 11 月 7 日最先留下了两份 Markdown，一份讲几个 Agent 一起做事该守哪些约定，一份从秘秘当时的代码出发，讨论记忆该怎么取、几个助手怎么交接。这里各留了一份原件，连目录和文件内容都照原样保存。两份都取自 Mimi-Superagent 的 PR #14，固定在同一次提交 `ad62b7f1301fa96474c160a7e58d2188785d7311`，归档时还是草稿。[原 PR](https://github.com/mor765504-gif/Mimi-Superagent/pull/14)

| 原件 | 行数 | Git blob SHA-1 |
| --- | ---: | --- |
| [MGRS 0.1 规范](../archive/2026-11-07/docs/plans/2026-11-07-mgrs-native-governance.md) | 333 | `6e244b81644bc65833a004e36bbb46a3bf417937` |
| [抽屉与九项架构研究](../archive/2026-11-07/docs/research/2026-11-07-drawers-architecture-review.md) | 353 | `2e278e8ed0a3e75563a70ad8c2c2974834d42a82` |

如果你手里也有一份，想比一下是不是同一个版本，来源清单里有原路径、固定链接、字节数和两种校验值，下载后可以在本地核对。[来源清单](../source-manifest.json) · [核对办法](PUBLISH.md)

<a id="编辑版导读和作者发言"></a>

## 后来为什么又有几种写法

想聊「这件事我愿不愿意交给助手」的具体情境，可以看[设计背景](FRAMEWORK-INTRO.md)。现行 0.1 的 16 章条文与 14 条不变量在 [MGRS 索引](../MGRS.md)下的独立 `spec/` 章节中。旧的[单文件技术参考地址](reference/mgrs-0.1-technical.md)只保留兼容跳转。初稿仍可与[归档原件](../archive/README.md)对照，研究材料见[研究全文](RESEARCH.md)。

后来我又用十二节讲了秘秘这个产品、背后让它跑起来的 Harness，以及我想拿出来跟大家聊的治理框架。现在的总览和导读里也会用日程、邮件这些例子，方便大家讨论。想找我当时的原话，可以直接翻 B 站答复的时间和楼层，像为什么自己做检索、为什么鼓励大家自己管资料，都能在那里找到。[产品总览](MIMI-OVERVIEW.md) · [评论区答疑摘记](sources/2026-11-09-bilibili-bv1vix26sEzR.md)

哪些是已经谈定的做法，哪些我还想听听不同意见，分别放在[设计决定](DECISIONS.md)和[开放问题](OPEN-QUESTIONS.md)。最早编这几篇导读时，页面怎么排参考了 DSH 的写法。[DSH 首页](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/README.md) · [DSH 理念说明](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/000-philosophy.md) · [文档修改记录](../CHANGELOG.md)

## 实现与测评材料

| 想追溯的判断 | 依据与适用时间 |
| --- | --- |
| Hermes 宿主、执行网关与自研搜索策略如何接入；机密计算采用过哪些参考材料 | [11 月 9 日工程与来源基线](sources/2026-11-09-system-baseline.md)，含固定源码、既有 CI、搜索运行记录和平台官方资料 |
| 组件如何交接、断线如何恢复、交互界面为什么能暴露验收问题 | [11 月 11 日源码与运行记录](sources/2026-11-11-integration.md)，按测试版本、执行环境和实际观察查阅 |
| 旧宿主为什么调整长对话压缩阈值和记忆额度 | [11 月 12 日整理的上下文评测](sources/2026-11-12-context-evaluation-baseline.md)，原评测报告日期为 9 月 26 日 |

这些记录里能看到当时用的版本、条件和脱敏后的结果。有些源代码、报告和日志在私有产品仓里，各页写明了能公开看到哪一部分。

## 2026-11-13 · MGRS 六部分主导航

按照此前 Mimi Harness 的整体运行图和受管多 Agent 流程图，MGRS 的 [主索引](../MGRS.md)改为从用户入口与授权到持久状态与恢复的六部分，具体解释分别位于 [parts/](../parts/01-entry-and-authority.md)。这是一种架构阅读顺序，不是额外部署的 Runtime，不替代或改写 [spec/](../spec/01-purpose-and-boundaries.md) 内的现行 16 章技术条款。已有实现、候选、历史试验和生产状态，仍以原有带日期的工程来源为准。
