# 编辑与审查

[首页](README.md) · [文档导航](docs/README.md) · [完整规范](MGRS.md) · [审查指南](docs/005-review-and-conformance.md)

MGRS 首先用于秘秘内部，允许受邀开发者讨论、审查和提出修改建议。讨论不自动产生实施、合并或对外发布授权。

## 从一个具体问题开始

可以通过 [Issue](https://github.com/mor765504-gif/MGRS/issues) 讨论规则，也可以通过 [Pull Request](https://github.com/mor765504-gif/MGRS/pulls) 提交明确的文字修订。首次阅读建议先看编号导读；提出条款变更前，检查对应规范、决定记录与开放问题。

最有用的反馈通常包含三件事：哪一条规则遇到了什么场景，现有表述为何不足，以及建议怎样修改。术语解释、来源补充、链接修正和可复现的反例都可以单独提交。简单勘误直接给出位置和改法即可。

## 修改入口

| 修改内容 | 对应文件 |
| :--- | :--- |
| 项目介绍、阅读顺序 | [README.md](README.md)、[docs/README.md](docs/README.md) |
| 概念解释与教学示例 | `docs/000-*.md` 至 `docs/005-*.md`，并链接对应规范章节 |
| 协议条款 | [MGRS.md](MGRS.md) |
| 研究依据与新的比较材料 | [RESEARCH.md](docs/RESEARCH.md)，注明新增研究的版本、日期与访问范围 |
| 已确认决定 | [DECISIONS.md](docs/DECISIONS.md)，保留明确的确认来源 |
| 尚未解决的边界 | [OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) |
| 来源与编辑说明 | [PROVENANCE.md](docs/PROVENANCE.md)、[CHANGELOG.md](CHANGELOG.md) |

不要用修改排版或扩写导读的方式静默改变权限边界、任务目标或验收强度。导读解释现有条款；若发现规则本身需要改变，应明确提出规范修订。历史研究中的结论保留原日期和基线，新的核验另写清楚。

`archive/` 为固定原稿，默认不改。对原稿的纠错通过编辑版和变更说明记录，保留历史文本。

## 提交建议

规则或证据方面的讨论，可以按下面的顺序写；与当前修改无关的项可以省略：

```text
涉及章节 / 条款：
场景与问题：
现有文字：
建议文字或替代方案：
对权限、作用范围或验收条件的影响：
证据、版本与实际执行范围：
仍未解决的问题：
```

有测试时注明版本、实际执行范围与回执；只提出测试设计时不得标为已通过。更详细的证据写法见[审查与符合性](docs/005-review-and-conformance.md)。请只放适合公开的材料，对私有路径或结果保留可说明的访问边界。

协议定位已确定，但 0.1 整体仍为设计候选。不要把每个草案条款都标成用户批准，更不能仅因 Markdown 被合并就宣布产品符合协议。

本仓库讨论技术治理。许可和再分发条件继续参照 [NOTICE.md](NOTICE.md)；引用参考项目不改变 MGRS 的许可定位。

## 本地检查

在仓库根目录执行，离线检查只需 Python 3：

```sh
python3 scripts/verify_archive.py
```

新增文档时，补齐阅读入口和相邻章节链接，并更新 [publish-files.txt](publish-files.txt)。变更说明写入 [CHANGELOG.md](CHANGELOG.md)，区分介绍性编辑、条款修订和新增验证证据。日常操作见 [PUBLISH.md](docs/PUBLISH.md)。

这个检查验证归档、链接和结构，不评价真实运行可靠性。对产品代码的实施与验收仍沿用原产品仓库的权威入口。
