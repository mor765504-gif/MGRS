# MGRS

**Mimi Governed Runtime Standard · 秘秘专有 Agent 治理协议**

协议版本 **0.1 / 设计候选** · 文档归档 **2026-11-07** · 仓库 **公开**

简单来说，MGRS 不是又一套 Agent 框架，也不是再挂一层调度中间件。它是秘秘内部怎么管好多 Agent 协作的一套协议——谁说了算、记性怎么装、做完怎么交差、别假装干完了。底座还是 Hermes（MCP / Skill / 心跳 / Loop）；我补的是记忆抽屉、Persona，和工坊那一层治理合同。

多 Agent 玩到头了，本质是 harness 调度和工程治理。工程长尾、假验收，这些要专门合同和证据分层；协作好不好，就看准确率、延迟、用量/成本、任务可靠性。本仓库用来**技术探讨与审查**，不收录产品对照、市场定位或竞品差异。

> 完整规范和研究原稿都在这里，不只是摘要。仓库已公开于 GitHub；文档写完 ≠ 产品实现、验收或上线完成。

## 阅读入口

| 文件 | 内容 | 使用方式 |
| :--- | :--- | :--- |
| [MGRS.md](MGRS.md) | 16 章完整规范、14 条治理不变量、上下文与结果合同、权限和恢复规则 | 日常编辑的主文件 |
| [RESEARCH.md](docs/RESEARCH.md) | 抽屉系统设计、开源机制比较及九项架构核查全文 | 查看技术依据与取舍 |
| [DECISIONS.md](docs/DECISIONS.md) | 原稿之后的对话决定及其确认状态 | 避免建议被误记为批准 |
| [OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) | 权威归属、验收边界、抽屉预算等待商榷问题 | 对外审查与逐项讨论 |
| [PROVENANCE.md](docs/PROVENANCE.md) | 固定提交、原文件路径、blob 校验与编辑说明 | 追溯来源 |
| [archive/](archive/README.md) | 两份与 GitHub 字节一致的原始 Markdown | 固定留档，不覆盖 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 编辑、提议与审查约定 | 提交修改前阅读 |

## 规范覆盖范围

身份与授权、四类上下文视图、版本化任务和结果交接、MCP 效果等级、Skill 生命周期、Persona、Profile 隔离、单宿主恢复、前后端契约、可靠性度量、实施映射及变更控制。

这里保留原有 Core、Hermes、Orchestration、Workshop 等组件的职责，也不把独立治理协议误写成全新执行框架。

## 文件结构

```text
MGRS/
├── README.md
├── MGRS.md
├── CONTRIBUTING.md
├── NOTICE.md
├── CHANGELOG.md
├── source-manifest.json
├── publish-files.txt
├── docs/
│   ├── RESEARCH.md
│   ├── DECISIONS.md
│   ├── OPEN-QUESTIONS.md
│   ├── PROVENANCE.md
│   └── PUBLISH.md
├── archive/
│   ├── README.md
│   └── 2026-11-07/docs/
│       ├── plans/2026-11-07-mgrs-native-governance.md
│       └── research/2026-11-07-drawers-architecture-review.md
└── scripts/
    ├── publish-github.sh
    └── verify_archive.py
```

## GitHub 仓库

公开仓库为 [`mor765504-gif/MGRS`](https://github.com/mor765504-gif/MGRS)。本地可用以下命令做文档结构校验：

```sh
python3 scripts/verify_archive.py
```

首次发布脚本见 [PUBLISH.md](docs/PUBLISH.md)；当前仓库已公开，勿再按「仅私有创建」流程重复建仓。

## 来源与状态

完整原稿保存在 [Mimi-Superagent PR #14](https://github.com/mor765504-gif/Mimi-Superagent/pull/14)，固定文档提交为 `ad62b7f1301fa96474c160a7e58d2188785d7311`。本次读取该 PR 为 Open / Draft。

原稿保留它自己的产品研究版本和证据范围。后续讨论另列，不回填成旧版本已经验证的事实。仓库公开范围与许可尚未另行确定，参见 [NOTICE.md](NOTICE.md)。
