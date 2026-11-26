[协议索引](../MGRS.md) · **MGRS 0.1 治理准则** · [上一章](15-conflict-and-change-control.md#mgrs-15)

<a id="mgrs-16"></a>

## 第十六条 · 诚实边界与已证能力账本

### 16.1 治理原则与工程证据

MGRS 规定秘秘怎样持续代表用户工作。本章记录哪一份源码、哪一次执行、在哪个环境下支持哪一项判断。开发源在 `assisthub`，配对的产品源码在 `Mimi-Superagent`，协议和证据索引在 `MGRS`。源码对齐、运行安装、真实模型调用和用户端验收分别保留日期与范围。新结果追加到对应版本，历史失败和未决事项仍可沿原记录回查。[证据等级与晋级门禁](13-reliability-and-promotion.md#mgrs-13)

### 16.2 历史研究基线（2026 年 11 月 7 日）

本章记录 2026 年 11 月 7 日原研究基线。各组件的源码和当时已有的运行记录提供了如下依据。

| 对象 | 当时确认的内容 |
| :--- | :--- |
| 身份、记忆与 Persona | Core 有真实宿主绑定、记忆作用域、按版本比对后更新（CAS）与撤回。mimi_memory 有刷新、2000 字符自动注入和显式召回。mimi_tavern 有 Persona 编译与上下文压缩。 |
| 任务与结果 | mimi_orchestration 有持久任务、依赖、版本化输入和原生回执。Workshop 区分收取、验收和交付。 |
| 技能与客户端 | Skill P6 管理批准与发布，历史真实部署记录了一项技能的发布与原生读取。Mac 候选源码含本地启停、登录与重连逻辑。 |

这一基线留下的验证问题包括新抽屉投影的相关性与 token 收益、复杂多 Agent 结论在交接中的准确性、当时独立候选的全部 Skill 发布和读取消费路径，以及 Profile 污染率、完整的 Skill/MCP 管理界面、组件冲突是否复现、MCP 各段实际延迟与宿主 24 小时运行及恢复表现。具体能力的结论由相应测试和运行记录给出。

[原研究记录](../docs/RESEARCH.md) · [逐字归档](../archive/2026-11-07/docs/plans/2026-11-07-mgrs-native-governance.md)

### 16.3 后续工程与实测记录

日期标明合并、实测归档或复核的时间。涉及产品仓候选时注明当时所在分支或 PR。对既有运行的判断沿所列工程记录引用。

| 日期与范围 | 可复核的依据 | 已取得的结论 |
| --- | --- | --- |
| 2026-11-16 · 机票观察源码复核 | [开发源 `71662538` 的观察与发送判断](https://github.com/mor765504-gif/assisthub/blob/71662538bc6368b42fa486ea05ffdc983f2e9d60/core/assisthub_core/travel/service.py#L292-L375) · [发布源 `b6d3fcaa` 的对应文件](https://github.com/mor765504-gif/Mimi-Superagent/blob/b6d3fcaafb90ea9840ebd4ebe3394a8c81bdade4/backend/core/assisthub_core/travel/service.py#L292-L375) | `SOURCE_PRESENT`。两个文件的 Git blob 均为 `0672a65f4fdb144701364a6ab762c5730acf1962`。代码分别判断报价有效性、用户阈值、静默时段、重复提醒降幅与待对账发送，发送前还会复查观察委托。连续一周的巡检覆盖与实际送达数需由运行记录度量。 |
| 2026-11-14 · 产品源码晋级 | [开发仓 PR #467，合并源码 `71662538`](https://github.com/mor765504-gif/assisthub/pull/467) · [发布仓 PR #23，合并提交 `b6d3fcaa`](https://github.com/mor765504-gif/Mimi-Superagent/pull/23) | 发布记录将产品源码与开发版本配对，并列出已执行的布局、安装及定向检查。该记录对应源码晋级。生产切换、实体设备上的完整用户流程分别按各自的运行证据登记。 |
| 2026-11-11 · 开发与发布目录兼容性 | [开发仓 PR #464，合并提交 `230b2758`](https://github.com/mor765504-gif/assisthub/pull/464) · [当日开发版本与发布候选 `1c353eda` 对照](../docs/sources/2026-11-11-integration.md) | `CONTROLLED_PASS` 适用于所列调用场景。PR 记录了测试辅助程序如何定位开发与发布目录，并在两种目录布局下核验原有调用入口。该日期所引发布端是候选版本。 |
| 2026-11-02 · 原生调度及已安装环境 | [开发仓 PR #451，真实模型执行与原始回执](https://github.com/mor765504-gif/assisthub/pull/451) · [PR #454，已安装环境的独立作用域验证](https://github.com/mor765504-gif/assisthub/pull/454) | 工程记录给出了真实模型路径的 `PROVIDER_PASS` 实例：A 完成后下游 C 自动启动。另一场景中的 B 有可读结果，未通过预设精确输出检查。已安装环境的定向验证与生产用户真实收单、消息交付各自记录。 |

[产品候选与系统基线](../docs/sources/2026-11-09-system-baseline.md) · [工程整合与验收记录](../docs/sources/2026-11-11-integration.md) · [历史上下文配置与评测](../docs/sources/2026-11-12-context-evaluation-baseline.md)

<a id="plugin-draft-status"></a>

### 16.4 插件治理设计（2026 年 11 月 27 日）

本次补充的是[插件治理](07-tools-and-effects.md#plugin-governance)及相应的运行约定。实际支持的插件、宿主、权限边界、交互、恢复和跨宿主协作，仍需按具体实现版本及运行记录逐项核验。此次规范修改不增加产品实现或测试通过的证据，原有工程记录保持不变。
