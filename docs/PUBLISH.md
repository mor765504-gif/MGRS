# GitHub 仓库维护与发布说明

[首页](../README.md) · [文档导航](README.md) · [编辑与审查](../CONTRIBUTING.md) · [来源核验](PROVENANCE.md)

## 当前状态（2026-11-09）

公开仓库已存在：[`mor765504-gif/MGRS`](https://github.com/mor765504-gif/MGRS)。完整规范包已推送到 `main`。文档完成不代表产品实现或验收完成。

## 发布目标

账号为 `mor765504-gif`，仓库名为 `MGRS`，可见性为**公开**。不 fork、不复制原产品 Git 历史，不覆盖已有同名仓库上的他人改动，也不向旧 PR 写入。

## 开始阅读或编辑

可以直接在 GitHub 阅读和编辑 Markdown。需要本地工作副本时，使用 Git 克隆已存在的仓库：

```sh
git clone https://github.com/mor765504-gif/MGRS.git
cd MGRS
```

已有克隆直接使用即可。首页与编号导读介绍概念，协议条款集中在 `MGRS.md`，文件职责见[文档导航](README.md)。

## 本地校验与日常更新

文档检查离线执行，只需 Python 3；不需要 GitHub CLI、产品运行环境或模型凭据：

```sh
python3 scripts/verify_archive.py
```

改动后检查本地链接、术语和证据范围；新增文件同时加入 `publish-files.txt`，并记录到 `CHANGELOG.md`。Git 工作副本还可以运行 `git diff --check` 检查空白格式。随后在已有仓库提交改动或提出 PR，写清介绍性编辑与条款变更的区别。

推送后核对远端提交和文件内容，避免只凭本地保存就报告发布完成。本仓库的检查只验证文档，不运行产品验收。

## 首次建仓脚本（历史）

`scripts/publish-github.sh --create` 最初按私有首发编写；现已改为创建**公开**仓库，并在推送前核对 `private == false`。若远端 `MGRS` 已存在，脚本会停止，避免覆盖。

日常更新请在已有克隆中修改、提交并推送，不必再跑建仓流程。

历史建仓脚本另外需要 Git 与 GitHub CLI；这些工具不是阅读文档或运行离线检查的前提。

## 编辑与可见性

可通过 GitHub 网页编辑 Markdown，或在本地修改后推送。`archive/` 固定原稿默认不改；协议修改写入 `MGRS.md` 并记录到 `CHANGELOG.md`。许可条款仍见 [NOTICE.md](../NOTICE.md)。
