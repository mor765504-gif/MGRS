# 仓库维护

[阅读指南](README.md) · [参与讨论](../CONTRIBUTING.md) · [原稿与来源](PROVENANCE.md)

改一两段文字，直接在 GitHub 上编辑 Markdown、提个 PR 就可以了。想在本地边读边改，可以先把仓库下载下来。[GitHub 仓库](https://github.com/mor765504-gif/MGRS)

```sh
git clone https://github.com/mor765504-gif/MGRS.git
cd MGRS
```

本地改好后，用 Python 3 检查一遍文档。这一步离线也能跑。

```sh
python3 scripts/verify_archive.py
git diff --check
```

脚本会核对原稿校验值和发布清单，也会检查 `parts/` 下六个架构与治理部分、`spec/` 下独立的 16 章、G01 至 G14 不变量、JSON 示例、旧链接兼容锚点，以及文章之间的链接。现行正式条文只有一个权威位置，即 `spec/`；`parts/` 从 Mimi Harness 运行过程解释这些关系；`MGRS.md` 负责主索引。六部分不是强制所有任务依次运行的六个新服务。新写了一篇，可以在读者会找它的地方加个链接，再把文件名补进[发布清单](../publish-files.txt)。如果还改了一条规则，提 PR 的时候可以讲讲哪个例子让你觉得原来的说法不够用。[参与讨论](../CONTRIBUTING.md)

提交后可以打开 PR 的文件预览，看一下图表、段落和链接在 GitHub 上实际是什么样。仓库里的发布脚本是最初建仓时用的。现在改文档，走普通提交和 PR 就行。[首次建仓脚本](../scripts/publish-github.sh) · [修改记录](../CHANGELOG.md)
