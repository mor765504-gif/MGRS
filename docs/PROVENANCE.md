# 原稿与来源

[阅读指南](README.md) · [协议正文](../MGRS.md) · [逐字归档](../archive/README.md)

## 最初的两份原稿

MGRS 0.1 来源于 2026 年 11 月 7 日的协议草案与抽屉架构研究。两份原件取自 Mimi-Superagent PR #14 的同一文档提交 `ad62b7f1301fa96474c160a7e58d2188785d7311`，归档时该 PR 为草稿。公开副本保留了原始字节。[原 PR](https://github.com/mor765504-gif/Mimi-Superagent/pull/14)

| 原件 | 行数 | Git blob SHA-1 |
| --- | ---: | --- |
| [MGRS 0.1 规范](../archive/2026-11-07/docs/plans/2026-11-07-mgrs-native-governance.md) | 333 | `6e244b81644bc65833a004e36bbb46a3bf417937` |
| [抽屉与九项架构研究](../archive/2026-11-07/docs/research/2026-11-07-drawers-architecture-review.md) | 353 | `2e278e8ed0a3e75563a70ad8c2c2974834d42a82` |

[来源清单](../source-manifest.json)保存原路径、固定链接、字节数、Git blob 与 SHA-256。[维护说明](PUBLISH.md)给出离线校验命令。

## 编辑版、导读和作者发言

[协议正文](../MGRS.md)沿用原来的 16 章和 14 条不变量，后续修订可与原件对照。[研究全文](RESEARCH.md)保留原有论证、比较表及证据索引，增加了便于跳读的目录与链接。该研究中的版本和运行判断均对应当时的基线。

作者在后续讨论中确认了产品、Harness 和协议的关系，并提供了十二节的产品说明。[设计决定](DECISIONS.md)记录具体决定及其确认程度，[开放问题](OPEN-QUESTIONS.md)保存尚待确定的边界。[公开答疑摘记](sources/2026-11-09-bilibili-bv1vix26sEzR.md)给出作者谈日程、工作连续性、数据自主和研究检索的原话及其位置。总览和导读里的任务例子用于解释这些设计。

编号导读最初的组织形式参考了 DSH 的[首页](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/README.md)与[理念说明](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/000-philosophy.md)。编辑历史见[变更记录](../CHANGELOG.md)。

## 实现与测评材料

| 想追溯的判断 | 依据与适用时间 |
| --- | --- |
| Hermes 宿主、执行网关与自研搜索策略如何接入；机密计算采用过哪些参考材料 | [11 月 9 日工程与来源基线](sources/2026-11-09-system-baseline.md)，含固定源码、既有 CI、搜索运行记录和平台官方资料 |
| 组件如何交接、断线如何恢复、交互界面为什么能暴露验收问题 | [11 月 11 日源码与运行记录](sources/2026-11-11-integration.md)，按测试版本、执行环境和实际观察查阅 |
| 旧宿主为什么调整长对话压缩阈值和记忆额度 | [11 月 12 日整理的上下文评测](sources/2026-11-12-context-evaluation-baseline.md)，原评测报告日期为 9 月 26 日 |

公开记录提供脱敏结果、条件和来源定位。部分固定源码、报告与原始日志位于私有实现仓，访问范围由各来源页说明。
