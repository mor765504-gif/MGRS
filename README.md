# MGRS

**Mimi Governed Runtime Standard · 秘秘专有 Agent 治理协议**

协议版本 **0.1 / 设计候选** · 文档归档 **2026-11-07** · 拟建仓库 **私有**

MGRS 首先服务于秘秘内部的 Agent 协作、上下文交接、工具执行、证据验收和故障恢复，同时允许外部开发者参与讨论与审查。它是一套协议，不是新增的 Agent 框架、中间层或第二个调度器。

> 本仓库包保留完整规范与研究原稿，不只是摘要。本包交付时尚未创建或推送新的 GitHub 仓库；后续实际发布以 GitHub 回读结果为准，发布方式见下方。文档完成不代表产品实现、验收或上线完成。

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

这里保留原有 Core、Hermes、Orchestration、Workshop 等组件的职责，不依赖 Superpowers，也不把独立治理协议误写成全新执行框架。

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

## 创建独立 GitHub 仓库

拟用名称为 `mor765504-gif/MGRS`，仅创建为私有，不覆盖同名仓库。需在本机已安装 Git、Python 3 和 GitHub CLI，并登录对应账号。

```sh
# 在解压得到的 MGRS 目录内执行
python3 scripts/verify_archive.py
bash scripts/publish-github.sh --create
```

发布脚本只使用清单内文件初始化一个新的文档历史；不复制 Mimi-Superagent 的 Git 历史，不删除或修改原产品仓库。脚本会检查账号、私有属性和远端提交。完整步骤及失败后的处理见 [PUBLISH.md](docs/PUBLISH.md)。

## 来源与状态

完整原稿保存在 [Mimi-Superagent PR #14](https://github.com/mor765504-gif/Mimi-Superagent/pull/14)，固定文档提交为 `ad62b7f1301fa96474c160a7e58d2188785d7311`。本次读取该 PR 为 Open / Draft。

原稿保留它自己的产品研究版本和证据范围。后续讨论另列，不回填成旧版本已经验证的事实。仓库公开范围与许可尚未另行确定，参见 [NOTICE.md](NOTICE.md)。
