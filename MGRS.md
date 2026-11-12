# MGRS 0.1 · 协议索引

**Mimi Governed Runtime Standard** · 秘秘自有 Agent 治理协议 · **0.1 设计候选**

这里是 MGRS 的独立入口。**正式技术条文的唯一现行位置是 `spec/`**，每一章可独立阅读、引用和修订。本页只提供索引和阅读路线，不额外建立另一套规范。

MGRS 讨论 Agent 如何在用户授权范围内持续做事、彼此交接、验证效果和处理异常。治理约束的是可观察的权限、事实、责任与效果，Agent 仍可自主选择方法。

第一次接触可先看[设计背景与真实场景](docs/FRAMEWORK-INTRO.md)；查规范直接进入下方章节；了解已确定和仍在讨论的判断，可看[设计决定](docs/DECISIONS.md)与[开放问题](docs/OPEN-QUESTIONS.md)。L0、L1、L2 仅作为导航分类，**不改变原 16 章的编号、规范效力或跨层关系**。

<a id="governance"></a>

## L0 · 治理内核

身份授权、治理权威与跨层冲突裁决。这里的分组是阅读导航，并不缩小条款的适用范围。

- <a id="mgrs-1"></a>[第 1 章 · 宗旨、边界与禁止事项](spec/01-purpose-and-boundaries.md#mgrs-1)
- <a id="mgrs-2"></a>[第 2 章 · 六个治理面与唯一权威](spec/02-governance-planes.md#mgrs-2)
- <a id="mgrs-3"></a>[第 3 章 · 十四条必须保持的不变量](spec/03-invariants.md#mgrs-3)
- <a id="mgrs-4"></a>[第 4 章 · 请求级治理合同 ContextEnvelope](spec/04-context-envelope.md#mgrs-4)
- <a id="mgrs-15"></a>[第 15 章 · 冲突裁决与变更控制](spec/15-conflict-and-change-control.md#mgrs-15)

<a id="collaboration"></a>

## L1 · 协作合同

任务委派、执行约束、外部效果与持续恢复。

- <a id="mgrs-5"></a>[第 5 章 · 任务与团队交接合同 Task / ResultCapsule](spec/05-task-result-capsule.md#mgrs-5)
- <a id="mgrs-6"></a>[第 6 章 · 统一任务纪律：不等于固定繁琐步骤](spec/06-task-discipline.md#mgrs-6)
- <a id="mgrs-7"></a>[第 7 章 · 工具与效果等级](spec/07-tools-and-effects.md#mgrs-7)
- <a id="mgrs-11"></a>[第 11 章 · 单宿主与持久恢复](spec/11-host-and-recovery.md#mgrs-11)

<a id="extensions"></a>

## L2 · 专项扩展

Skill、Persona、数据隔离与终端管理等专项协议。

- <a id="mgrs-8"></a>[第 8 章 · Skill 生命周期与本土流程规范](spec/08-skill-lifecycle.md#mgrs-8)
- <a id="mgrs-9"></a>[第 9 章 · Persona 与人味](spec/09-persona.md#mgrs-9)
- <a id="mgrs-10"></a>[第 10 章 · Profile / Cache / 文件隔离](spec/10-profile-cache-isolation.md#mgrs-10)
- <a id="mgrs-12"></a>[第 12 章 · Web/Mac 管理界面与后端契约](spec/12-web-mac-contract.md#mgrs-12)

<a id="implementation"></a>

## 实施、度量及待证边界

评测标准、实施分期与现有证据范围。

- <a id="mgrs-13"></a>[第 13 章 · 可靠性度量与正式晋级标准](spec/13-reliability-and-promotion.md#mgrs-13)
- <a id="mgrs-14"></a>[第 14 章 · 实施映射与分期](spec/14-implementation-phases.md#mgrs-14)
- <a id="mgrs-16"></a>[第 16 章 · 确认的已有能力与待证边界](spec/16-capabilities-and-gaps.md#mgrs-16)

## 解释、研究和参与

- [设计背景和具体场景](docs/FRAMEWORK-INTRO.md) · [专题导读](docs/README.md) · [产品与 Harness 总览](docs/MIMI-OVERVIEW.md)
- [设计决定](docs/DECISIONS.md) · [开放问题](docs/OPEN-QUESTIONS.md) · [参与共创](CONTRIBUTING.md)
- [来源与版本](docs/PROVENANCE.md) · [研究全文](docs/RESEARCH.md) · [历史原稿](archive/README.md)

MGRS 0.1 是公开讨论中的设计候选，不等于秘秘产品已实现或通过验收。规范文本按 [CC BY 4.0](LICENSE) 授权，具体范围见[许可说明](NOTICE.md)。
