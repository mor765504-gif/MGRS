[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](15-conflict-and-change-control.md#mgrs-15)

<a id="mgrs-16"></a>

## 16. 确认的已有能力与待证边界

本章记录 2026 年 11 月 7 日原研究基线。各组件的源码和当时已有的运行记录提供了如下依据。

| 对象 | 当时确认的内容 |
| :--- | :--- |
| 身份、记忆与 Persona | Core 有真实宿主绑定、记忆作用域、按版本比对后更新（CAS）与撤回。mimi_memory 有刷新、2000 字符自动注入和显式召回。mimi_tavern 有 Persona 编译与上下文压缩。 |
| 任务与结果 | mimi_orchestration 有持久任务、依赖、版本化输入和原生回执。Workshop 区分收取、验收和交付。 |
| 技能与客户端 | Skill P6 管理批准与发布，历史真实部署记录了一项技能的发布与原生读取。Mac 候选源码含本地启停、登录与重连逻辑。 |

这一基线留下的验证问题包括新抽屉投影的相关性与 token 收益、复杂多 Agent 结论在交接中的准确性、当时独立候选的全部 Skill 发布和读取消费路径，以及 Profile 污染率、完整的 Skill/MCP 管理界面、组件冲突是否复现、MCP 各段实际延迟与宿主 24 小时运行及恢复表现。具体能力的结论由相应测试和运行记录给出。

源码目录和当时的具体观察见[原研究记录](../docs/RESEARCH.md)与[逐字归档](../archive/2026-11-07/docs/plans/2026-11-07-mgrs-native-governance.md)。后续资料可按问题查阅：[产品候选与源码](../docs/sources/2026-11-09-system-baseline.md)、[工程整合与验收记录](../docs/sources/2026-11-11-integration.md)、[历史上下文配置与评测](../docs/sources/2026-11-12-context-evaluation-baseline.md)。
