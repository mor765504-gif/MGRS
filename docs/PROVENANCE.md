# 来源、版本与编辑说明

[首页](../README.md) · [协议正文](../MGRS.md) · [原稿归档](../archive/README.md)

## 固定来源

本次实际读取原仓库 PR #14，返回状态为 Open / Draft，head 为 `ad62b7f1301fa96474c160a7e58d2188785d7311`。以下两份文件均按这个提交读取，未依据可变的 `main` 重新拼接。

| 文件 | 原 Git blob SHA-1 | 原文行数 | 归档副本 |
| :--- | :--- | ---: | :--- |
| MGRS 0.1 规范 | `6e244b81644bc65833a004e36bbb46a3bf417937` | 333 | [原文](../archive/2026-11-07/docs/plans/2026-11-07-mgrs-native-governance.md) |
| 抽屉与九项架构研究 | `2e278e8ed0a3e75563a70ad8c2c2974834d42a82` | 353 | [原文](../archive/2026-11-07/docs/research/2026-11-07-drawers-architecture-review.md) |

[原规范](https://github.com/mor765504-gif/Mimi-Superagent/blob/ad62b7f1301fa96474c160a7e58d2188785d7311/docs/plans/2026-11-07-mgrs-native-governance.md) · [原研究记录](https://github.com/mor765504-gif/Mimi-Superagent/blob/ad62b7f1301fa96474c160a7e58d2188785d7311/docs/research/2026-11-07-drawers-architecture-review.md) · [原 PR #14](https://github.com/mor765504-gif/Mimi-Superagent/pull/14)

本地逐字归档按 UTF-8 字节计算 Git blob SHA-1，与 GitHub 返回值相等。机器可读校验另存 [source-manifest.json](../source-manifest.json)。行数按 `splitlines()` 计算，因此末尾换行不会另算一行。

## 编辑了什么

`MGRS.md` 保留原稿从第 1 到第 16 章的所有内容，增加顶部元信息表、目录、锚点以及 G01 至 G14 的编号强调。原稿顶部关于旧分支位置的文字移至此来源说明，逐字原件不变。

`docs/RESEARCH.md` 保留原研究记录所有编号章节、比较表和来源索引，增加目录，把 S/E 标记改成可点击的内部跳转，并将指向规范的本地相对路径适配到新文件结构。没有增删其技术论点，也没有重做第三方项目的研究。

`docs/DECISIONS.md` 和 `docs/OPEN-QUESTIONS.md` 是根据本次对话另行整理的补充，标明用户明确决定、对话沿用解释以及尚未确认的事项。它们不冒充 PR #14 原文。

## 没有做什么

本次没有重新测试秘秘、没有验证生产状态、没有运行外部模型，也没有核实原研究引用的每个网站今日是否变化。原文中的“已核实”“本次”等措辞属于原稿的历史研究范围。

没有搬运应用源码、原仓库 Git 历史、凭据、真实会话数据库或完整私人人格卡。独立仓库尚未远端创建或推送，本包不是发布完成回执。

## 本地核对

```sh
python3 scripts/verify_archive.py
```

该命令仅检查文档和归档完整性，不运行产品测试，不调用网络，不替代 MGRS 符合性验证。
