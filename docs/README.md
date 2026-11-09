# 文档导航

[仓库首页](../README.md) · [完整规范](../MGRS.md) · [编辑与审查](../CONTRIBUTING.md)

这里把第一次阅读、深入理解和逐条审查分开安排。编号导读解释 MGRS 0.1 中已有的概念与合同；需要确认一个规则的完整范围时，沿页内链接回到规范正文。

## 先看产品与系统的完整关系

[《秘秘 Mimi：产品哲学、系统架构与 MGRS 治理协议》](MIMI-OVERVIEW.md)保留十二个部分，完整介绍产品哲学、自有宿主、Persona、Memory、上下文、自研搜索策略、工具与 Skill、多 Agent 工坊、执行网关、机密计算及个人与企业路径。Mimi 产品、Mimi Harness 实现和 MGRS 协议分别承担自己的职责。

总览中的当前状态以[2026-11-09 工程与来源基线](sources/2026-11-09-system-baseline.md)为依据；原研究记录继续保留历史版本。

## 按顺序了解 MGRS

| 顺序 | 文档 | 重点 |
| :--- | :--- | :--- |
| 000 | [设计理念](000-philosophy.md) | 为什么协作可靠性需要事实权威、版本和证据 |
| 001 | [核心对象](001-domain-model.md) | 身份、作用域、会话、任务与结果的基本词汇 |
| 002 | [架构关系](002-architecture.md) | 现有组件的职责与信息关系 |
| 003 | [上下文与记忆](003-context-and-memory.md) | 抽屉、Persona、方法与历史如何进入一轮请求 |
| 004 | [执行与证据](004-execution-and-evidence.md) | 从任务要求到结果验收与交付的完整示例 |
| 005 | [审查与符合性](005-review-and-conformance.md) | 状态、证据层级、待决边界与审查入口 |
| 006 | [秘秘自研搜索策略](006-search-strategy.md) | 搜索方法的设计归属、查询与证据规则、原生工具接入和已有记录 |

## 按需要查阅

| 你想做什么 | 建议入口 |
| :--- | :--- |
| 快速知道项目解决什么问题 | [首页](../README.md)与 [000](000-philosophy.md) |
| 从产品哲学看到整个系统 | [产品与系统总览](MIMI-OVERVIEW.md) |
| 讨论秘秘自研搜索策略 | [006](006-search-strategy.md)与[固定源码及证据](sources/2026-11-09-system-baseline.md#source-search) |
| 弄清组件关系与是否要新增服务 | [002](002-architecture.md)与[规范第 2 章](../MGRS.md#mgrs-2) |
| 讨论记忆、人格和上下文预算 | [003](003-context-and-memory.md)与[研究第 3 至 6 节的入口](RESEARCH.md#research-3) |
| 讨论多 Agent 结果交接与“假验收” | [004](004-execution-and-evidence.md)与[规范第 5 章](../MGRS.md#mgrs-5) |
| 核对工具授权或 Skill 生命周期 | [规范第 7 章](../MGRS.md#mgrs-7)与[第 8 章](../MGRS.md#mgrs-8) |
| 对照某个产品实现是否符合 | [005](005-review-and-conformance.md)与[规范第 13 至 16 章的入口](../MGRS.md#mgrs-13) |
| 提议修改某条规则 | [待商榷事项](OPEN-QUESTIONS.md)、[决定记录](DECISIONS.md)与[贡献指南](../CONTRIBUTING.md) |
| 查找一个判断从何而来 | [来源说明](PROVENANCE.md)、[研究记录](RESEARCH.md)与[原稿归档](../archive/README.md) |

## 各类文件负责什么

**规范正文**集中在 [MGRS.md](../MGRS.md)。导读里的简化解释和虚构示例不增加规则，不替代原条款中的条件。若两者有歧义，应回到对应条款与决定记录核对，修正导读。

**研究记录**保留原研究时的来源、比较与访问边界。它提供设计依据，历史源码观察不能直接当作当前候选或生产环境的状态。

**产品总览**说明用户确认的产品哲学、系统组织及应用背景，**自研搜索策略导读**说明已有方法与接入。它们的工程事实链接到带日期的核查记录；产品目标和未来技术路线按各自状态表达。

**决定记录**区分已确认方向与尚未确认的提议；**待商榷事项**保留未定边界。新增解释不自动把待决问题改成定案。

**归档**固定原始文本与校验值；**变更记录**说明后续编辑。日常修改在编辑版进行，原稿保留历史面貌。发布与维护方法见 [PUBLISH.md](PUBLISH.md)。

## 文档组织参考

此次导读采用“简短首页 + 按概念递进的编号文档”的组织方式，参考 [DSH README](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/README.md) 和 [000 Philosophy](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/000-philosophy.md)，固定参考提交为 `8c32a9dc5d72c033816c6a8110b37f40cf94fba4`。

这里借鉴阅读顺序与概念说明方式。MGRS 的具体条款、领域对象、运行架构和许可继续由本项目自己的规范与决定记录定义。
