[返回 MGRS 六部分索引](../MGRS.md) · 第二部分 / 六

<a id="part-2"></a>

# 第二部分 · 上下文与请求装配

第二部分解决“这一轮模型究竟基于什么材料工作”。Core、Persona、原生会话、任务状态、Skill 目录和外置原件都可能提供信息，但**有保存记录、被授权读取、被投影选中、进入最终请求和正确使用**是不同事实。

## 不同信息有不同来源

| 对象 | 负责什么 |
| --- | --- |
| Core Memory | 当前有效、可纠正、按 scope 授权的长期事实 |
| Persona / mimi_tavern | 身份表达、场景切面和语境，不存任务验收事实 |
| Hermes 原生 Session | 对话、工具结果与可回查的历史和压缩状态 |
| Orchestration / 当前任务 | 最新目标、要求修订、依赖、未完成事项 |
| Skill / 外置材料 | 已批准的方法目录和版本化原件引用 |

用户说“接着弄昨天那份报告”，不能因为 Persona 口吻熟悉，就认定昨天的任务已经完成；也不能因为本轮抽屉没有注入某封原邮件，就认为原件不存在。

## 请求级的 ContextEnvelope

0.1 规范提出的 ContextEnvelope 是宿主侧的请求级治理合同。它记录可信身份和授权代次、逻辑轮次、任务版本、Persona/Skill 来源版本、必需与可选引用、遗漏原因以及渲染摘要。模型应只得到本轮获授权而且有用的内容，并非把审计元数据或全部私人原文交给模型。

首版事实投影的 2000 **字符**预算，不是 2000 token，也不是整个模型上下文的容量。明确的当前任务约束不能因记忆排序低被静默丢弃。超出预算时，可以拆分、回读原件或显式阻塞，不能假装模型已有完整信息。

## 缓存和压缩不能重写事实

缓存要看权限代次、scope、事实版本、任务修订、Persona/Skill 清单与到期时间。事实内容没有改动，不等于读取权限一直有效。抽屉、压缩摘要和可阅读的 memory 文件都是可重建视图，不能成为第二份可写事实权威。

这一部分最后要核对哪些材料确实进入了 Hermes 最终请求。request_included 与 step_observed 可以证明输入被包含、观察到关联响应，却不能证明模型正确理解。结果是否正确，要进入第五部分验证。

**正式约束：** [ContextEnvelope 与具体投影](../spec/04-context-envelope.md#mgrs-4) · [Persona](../spec/09-persona.md#mgrs-9) · [Profile / Cache 隔离](../spec/10-profile-cache-isolation.md#mgrs-10) · [G06、G08、G11](../spec/03-invariants.md#mgrs-3)。

**工程背景：** [上下文与记忆](../docs/003-context-and-memory.md) · [九项架构研究](../docs/RESEARCH.md#research-3) · [历史上下文评测](../docs/sources/2026-11-12-context-evaluation-baseline.md)。完整 ContextEnvelope 仍属于规范设计，不能仅凭局部字段推断已全部上线。
