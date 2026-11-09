# 来源、版本与编辑说明

[首页](../README.md) · [文档导航](README.md) · [协议正文](../MGRS.md) · [原稿归档](../archive/README.md)

## 固定原稿来源（2026-11-07）

首次归档读取原仓库 PR #14 时，记录的状态为 Open / Draft，head 为 `ad62b7f1301fa96474c160a7e58d2188785d7311`。这是归档时的历史记录，不表示该 PR 的当前状态。以下两份文件均按这个提交读取，未依据可变的 `main` 重新拼接。

| 文件 | 原 Git blob SHA-1 | 原文行数 | 归档副本 |
| :--- | :--- | ---: | :--- |
| MGRS 0.1 规范 | `6e244b81644bc65833a004e36bbb46a3bf417937` | 333 | [原文](../archive/2026-11-07/docs/plans/2026-11-07-mgrs-native-governance.md) |
| 抽屉与九项架构研究 | `2e278e8ed0a3e75563a70ad8c2c2974834d42a82` | 353 | [原文](../archive/2026-11-07/docs/research/2026-11-07-drawers-architecture-review.md) |

[原规范](https://github.com/mor765504-gif/Mimi-Superagent/blob/ad62b7f1301fa96474c160a7e58d2188785d7311/docs/plans/2026-11-07-mgrs-native-governance.md) · [原研究记录](https://github.com/mor765504-gif/Mimi-Superagent/blob/ad62b7f1301fa96474c160a7e58d2188785d7311/docs/research/2026-11-07-drawers-architecture-review.md) · [原 PR #14](https://github.com/mor765504-gif/Mimi-Superagent/pull/14)

本地逐字归档按 UTF-8 字节计算 Git blob SHA-1，与 GitHub 返回值相等。机器可读校验另存 [source-manifest.json](../source-manifest.json)。行数按 `splitlines()` 计算，因此末尾换行不会另算一行。

## 编辑版与历史变更

首次整理时，`MGRS.md` 保留原稿第 1 至第 16 章，增加顶部元信息表、目录、锚点及 G01 至 G14 的编号强调；原稿顶部的旧分支位置说明移至本页。后续维护曾依据技术讨论补充边界说明、调整第 1 章的表达，具体见 [CHANGELOG.md](../CHANGELOG.md)。编辑版应与各次变更记录一起阅读，逐字原件保留在 `archive/`。

`docs/RESEARCH.md` 保留原研究记录所有编号章节、比较表和来源索引，增加目录，把 S/E 标记改成可点击的内部跳转，并将指向规范的本地相对路径适配到新文件结构。没有增删其技术论点，也没有重做第三方项目的研究。

`docs/DECISIONS.md` 和 `docs/OPEN-QUESTIONS.md` 是根据后续讨论另行整理的补充，标明用户明确决定、对话沿用解释以及尚未确认的事项。它们不冒充 PR #14 原文。

## 介绍文档维护（2026-11-09）

本次以 MGRS 的 `main` 提交 `8e67d2d366009c45ad5d488f6ca464b589bbd95f` 为维护起点，读取仓库文件并核对 Git blob，新增 `docs/000-*.md` 至 `docs/005-*.md` 六篇导读与 `docs/README.md`，扩写首页、编辑与维护说明。导读的依据为现有规范、决定记录与开放问题；正文中的教学任务明确标为示例。

文档组织形式参考 DSH 的[首页](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/README.md)与[理念说明](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/8c32a9dc5d72c033816c6a8110b37f40cf94fba4/docs/000-philosophy.md)，固定参考提交为 `8c32a9dc5d72c033816c6a8110b37f40cf94fba4`。此次参考用于阅读结构与概念解释，不构成运行架构、性能或许可的迁移。

此次维护保留 MGRS 规范、研究全文和逐字原稿，未重新测试秘秘、验证生产状态或调用产品模型。原文中的“已核实”“本次”等措辞仍属于原稿的历史研究范围；未重新核验原研究所引用的全部外部项目。

## 当前仓库状态与来源清单

2026-11-09 已通过 GitHub 读取确认 [`mor765504-gif/MGRS`](https://github.com/mor765504-gif/MGRS) 为公开仓库，默认分支为 `main`。早期文档包中的“尚未创建或推送”是首次归档时的状态，现已在本页和 [source-manifest.json](../source-manifest.json) 中修正。

`source-manifest.json` 的 `date` 保留原稿归档日期；`remote_repository_created` 记录已确认的建仓状态，新增仓库核验日期与当时的提交引用。两份来源文件的固定提交、Git blob SHA-1、SHA-256、字节数和行数均保留。

本仓库保存协议文档，不包含产品应用源码、凭据、真实会话数据库或完整私人人格卡。日常远端更新以实际提交与文件回读为准，操作说明见 [PUBLISH.md](PUBLISH.md)。

## 本地核对

```sh
python3 scripts/verify_archive.py
```

该命令仅检查文档和归档完整性，不运行产品测试，不调用网络，不替代 MGRS 符合性验证。
