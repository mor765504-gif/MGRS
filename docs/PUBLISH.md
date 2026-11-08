# GitHub 仓库发布说明

[首页](../README.md) · [来源核验](PROVENANCE.md)

## 当前状态（2026-11-09）

公开仓库已存在：[`mor765504-gif/MGRS`](https://github.com/mor765504-gif/MGRS)。完整规范包已推送到 `main`。文档完成不代表产品实现或验收完成。

## 发布目标

账号为 `mor765504-gif`，仓库名为 `MGRS`，可见性为**公开**。不 fork、不复制原产品 Git 历史，不覆盖已有同名仓库上的他人改动，也不向旧 PR 写入。

## 本地校验

本机需要 Git、Python 3 和 GitHub CLI：

```sh
python3 scripts/verify_archive.py
```

## 首次建仓脚本（历史）

`scripts/publish-github.sh --create` 最初按私有首发编写；现已改为创建**公开**仓库，并在推送前核对 `private == false`。若远端 `MGRS` 已存在，脚本会停止，避免覆盖。

日常更新请在已有克隆中修改、提交并推送，不必再跑建仓流程。

## 编辑与可见性

可通过 GitHub 网页编辑 Markdown，或在本地修改后推送。`archive/` 固定原稿默认不改；协议修改写入 `MGRS.md` 并记录到 `CHANGELOG.md`。许可条款仍见 [NOTICE.md](../NOTICE.md)。
