# 创建独立 GitHub 仓库

[首页](../README.md) · [来源核验](PROVENANCE.md)

## 归档交付时的状态（2026-11-07）

**本包已经生成，但远端新仓库尚未创建或推送。** 当前对话可调用的 GitHub 工具只提供读取，不提供创建或写入动作。因此没有新仓库 URL、推送提交或合并结果可以报告。

下面的辅助脚本需要由有 GitHub 写入权限的本机环境运行。本次只对脚本做本地检查，未实际执行远端发布。

## 发布目标

账号为 `mor765504-gif`，仓库名为 `MGRS`，可见性固定为私有。不公开、不 fork、不复制原产品 Git 历史，不覆盖同名仓库，也不向旧 PR 写入。

## 执行

本机需要 Git、Python 3 和 GitHub CLI。未登录时先执行：

```sh
gh auth login --hostname github.com
```

在解压后的 `MGRS` 目录执行：

```sh
python3 scripts/verify_archive.py
bash scripts/publish-github.sh --create
```

脚本检查登录账号和文件清单，在当前文档文件夹建立新的 Git 历史，创建私有仓库，确认其可见性后再推送，并读回远端提交 SHA。它不会改变全局 Git 配置。

为避免误修改旧仓库，脚本拒绝在已有 Git 仓库或其子目录中初始化。若同名远端已存在，脚本停止，不自动覆盖或改名。

## 失败后的处理

如果创建仓库的返回不明确，先查看 GitHub 实际状态，不能把网络超时当成“肯定没创建”。如果仓库创建成功但推送失败，本地提交和 `origin` 会保留，不删除，也不自动重复创建。

确认目标仓库确实为自己刚建的私有 `MGRS`、`origin` 正确且远端没有其他人的改动后，才进行正常推送。可先运行以下只读检查：

```sh
git status
git remote -v
gh repo view mor765504-gif/MGRS --json nameWithOwner,isPrivate,url
```

## 编辑与可见性

创建后可以通过 GitHub 的文件编辑入口修改 Markdown，也可以在本地修改、提交并推送。固定原稿应保留；协议修改写入 `MGRS.md` 并记录到 `CHANGELOG.md`。公开或邀请协作者不由本脚本自动执行。

## 命令依据

[GitHub CLI：gh repo create](https://cli.github.com/manual/gh_repo_create) 公开说明支持 `--private`、`--source` 和 `--remote`。本包采用这些创建参数，并将推送放在私有属性核对之后。
