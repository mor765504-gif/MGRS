# MGRS 阅读指南

[首页](../README.md) · [MGRS 协议索引](../MGRS.md) · [参与共创](../CONTRIBUTING.md)

如果你是从视频过来的，想知道秘秘能帮忙做什么，我为什么想做它，可以先看[产品哲学](MIMI-OVERVIEW.md)。[设计背景](FRAMEWORK-INTRO.md)里用的是约读书会的例子，正式条文可从[协议索引](../MGRS.md)逐章查看。对哪一块感兴趣，再从下面挑一篇就好。

**先讨论好产品应遵循什么原则，再决定怎样实现。** 我把 MGRS 从开发秘秘的经验里整理出来，是想和 Agent 行业的从业者、独立开发者，以及同样想做这类产品的人讨论：一个真正能长期替人做事的 Agent，应该在什么范围内自主行动？用户怎样修改要求、撤回授权或接管决定？多个 Agent 交接时，怎样保留人的意思、核对实际结果？这些问题值得先讲清楚。原则和责任边界明确之后，工程选型、功能取舍与架构演进才有共同依据，不必边做边重新争论产品究竟要成为什么。

MGRS 讨论的是这些产品治理原则及其可以检验的协作约定，**不要求采用某一种模型、调度器或技术栈**。Mimi Harness 是我对这些原则的一种工程实践，不是别人参与讨论或采用原则的前提。不同产品完全可以采用不同实现，也可以基于各自的使用场景修订草案。

<a id="顺着你关心的问题读"></a>

| 文章 | 里面聊什么 |
| --- | --- |
| [000 · 为什么聊 Agent 治理](000-philosophy.md) | 让助手帮忙写纪要时，有些话我只愿意私下跟它聊。 |
| [001 · 任务和上下文](001-domain-model.md) | 聊天窗口关了，昨天说到一半的事怎么接着做。 |
| [002 · 主对话与工坊](002-architecture.md) | 我在主窗口补了一句话，后台几个助手怎么分头往下做。 |
| [003 · 上下文、记忆与 Persona](003-context-and-memory.md) | 助手可以记得我的习惯，换到另一个项目，该想起哪一部分？ |
| [004 · 几个人接手同一件事](004-execution-and-evidence.md) | 查资料的人只说「我没找到」，写稿的人能不能就写「没有」？ |
| [005 · 哪些判断可以交给助手](005-review-and-conformance.md) | 会上有人说愿意先了解一下，纪要里该怎么写。 |
| [006 · 秘秘自研搜索策略](006-search-strategy.md) | 找论文的时候我怎么选来源，读到哪里才够回答手头的问题。 |

关于秘秘，还有些来回在[视频评论区的答复](sources/2026-11-09-bilibili-bv1vix26sEzR.md)里。[设计决定](DECISIONS.md)里可以翻到已经定下来的想法，[开放问题](OPEN-QUESTIONS.md)里有想请大家一起想的部分。

## 从 Harness 运行过程理解 MGRS

六个部分是架构与治理的主阅读路线，并非六个独立的服务或者固定的任务执行步骤。

| 阅读顺序 | 关注的问题 |
| --- | --- |
| [第 1 部分 · 用户入口与授权](../parts/01-entry-and-authority.md#part-1) | 可信入口、Profile、scope、授权与撤回 |
| [第 2 部分 · 上下文与请求装配](../parts/02-context-and-request.md#part-2) | Core、Memory、Persona、会话与 ContextEnvelope |
| [第 3 部分 · 决策、规划与协作编排](../parts/03-decision-and-orchestration.md#part-3) | 主 Agent、受管任务、依赖、版本与 Worker |
| [第 4 部分 · 执行与外部效果](../parts/04-execution-and-effects.md#part-4) | Hermes、MCP、Skill、插件、执行网关与外部效果 |
| [第 5 部分 · 成果交接、验收与交付](../parts/05-evidence-and-delivery.md#part-5) | ResultCapsule、四级回报、验收与 GenUI |
| [第 6 部分 · 持续工作与运行治理](../parts/06-persistence-and-operations.md#part-6) | 持续委托、方法重判、中断恢复与可靠性验证 |

十六条治理准则在 `spec/` 中逐条维护，约定各组件协作时的权责、版本、执行与验收依据。六部分将这些准则放回用户交代的一项具体工作中解释。

如果关心不同生态的插件怎样接入同一个私人助手，可以先读[学习与项目协作的例子](../parts/04-execution-and-effects.md#plugin-example)，再读[插件治理正式条文](../spec/07-tools-and-effects.md#plugin-governance)。这里先约定用户委托与运行责任，不以已实现功能为前提。

## 延伸材料

[六部分主索引](../MGRS.md) · [十六条治理准则目录](reference/mgrs-0.1-technical.md) · [原始研究与出处](PROVENANCE.md) · [变更记录](../CHANGELOG.md)
