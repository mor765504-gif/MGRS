# 原生 Mimi GenUI 渲染输出示例

[返回第五部分](../../../parts/05-evidence-and-delivery.md#part-5) · [其他静态图例](README.md)

下列四幅图使用 **Mimi Harness 实际的 `mimi-ui/1` 目录、`guBuild` / `guHTML` 渲染函数及 `base.css` 中的 `.gu-*` 组件样式**生成。原始源码固定于 [assisthub@b7031dbc](https://github.com/mor765504-gif/assisthub/tree/b7031dbc3fd5f16611486311c7007f2b633a7337)，具体为 [`catalog.js`](https://github.com/mor765504-gif/assisthub/blob/b7031dbc3fd5f16611486311c7007f2b633a7337/frontend/web/shared/genui/catalog.js)、[`renderer.js`](https://github.com/mor765504-gif/assisthub/blob/b7031dbc3fd5f16611486311c7007f2b633a7337/frontend/web/shared/genui/renderer.js) 和 [`base.css`](https://github.com/mor765504-gif/assisthub/blob/b7031dbc3fd5f16611486311c7007f2b633a7337/frontend/web/styles/base.css)。

生成方式是对以下每份示例 markup 使用原生 `guBuild` 验证并调用 `guHTML` 输出组件 DOM，再将生成的 HTML 与原生组件 CSS 封装为 **静态 SVG `foreignObject` 预览**。这些是真实渲染器的结构化输出，不是另行手绘的 UI；但它们**不是完整 Mimi 产品运行截图**，也没有真实模型调用、Core 身份、保存、审批或对外发送。GitHub 中的 SVG 是图片，控件和按钮不可操作。需支持 SVG `foreignObject` 的阅读器才能显示内部 HTML。

## 示例 1 · 会议纪要审阅

认领事实与本地负责人草稿分离。场景数据全部为虚构。

![会议纪要审阅，由 Mimi 原生渲染器生成](../../assets/genui/meeting-review.svg)

对应的 `mimi-ui/1` 组件输入：

```mimi-ui
<Card title="会议行动项 · 审阅草稿" sub="示例纪要 v2 · 等待用户审阅">
<Row>
<Stat label="已确认认领" value="2" tone="ok"/>
<Stat label="待确认" value="1" tone="warn"/>
</Row>
<Table cols="行动项|会议依据|当前判断">
<Tr hl>整理预算清单|发言 `03|已认领</Tr>
<Tr>联系供应商|发言 `06|待确认</Tr>
<Tr>提交纪要初稿|发言 `09|已认领</Tr>
</Table>
<Text muted>“这个我可以先了解一下”不足以证明正式认领。</Text>
<Choice name="owner" label="待确认事项的编辑草稿" options="待确认|拟指派" value="待确认"/>
<Actions>
<Button copy="预算：已认领；供应商联系：待确认；纪要初稿：已认领">复制审阅摘要</Button>
</Actions>
</Card>
```

## 示例 2 · 研究证据卡

原件范围、结论与未决缺口同屏呈现。场景数据全部为虚构。

![研究证据卡，由 Mimi 原生渲染器生成](../../assets/genui/research-evidence.svg)

对应的 `mimi-ui/1` 组件输入：

```mimi-ui
<Card title="研究资料 · 证据核对" sub="示例材料 A / B · 虚构研究材料">
<Row>
<Stat label="已定位原件" value="2" tone="ok"/>
<Stat label="未决问题" value="1" tone="warn"/>
</Row>
<Table cols="来源|已读材料|可支持的判断">
<Tr hl>材料 A|第 4 页|有删除申请步骤</Tr>
<Tr>材料 B|第 1–6 页|暂未找到相应说明</Tr>
</Table>
<Text>未找到条款，不等于该服务没有删除机制。</Text>
<Checklist name="checks">
<Item done>保留材料 A 原文位置</Item>
<Item done>记录材料 B 已读范围</Item>
<Item>继续检查 B 的附录</Item>
</Checklist>
</Card>
```

## 示例 3 · Worker 交接与验收

Consumed 与 Accepted 不能混同。场景数据全部为虚构。

![Worker 交接与验收，由 Mimi 原生渲染器生成](../../assets/genui/worker-handoff.svg)

对应的 `mimi-ui/1` 组件输入：

```mimi-ui
<Card title="Worker A → Worker C" sub="任务 r3 · 演示 ResultCapsule 交接">
<Row>
<Stat label="要求版本" value="r3"/>
<Stat label="结果记录" value="R-042"/>
<Stat label="未决核验" value="1" tone="warn"/>
</Row>
<Table cols="层级|交接证据|状态">
<Tr>Durable|Attempt + result_id|已入账</Tr>
<Tr>Routed|授权接收者|已路由</Tr>
<Tr hl>Consumed|request_included + step_observed|已观察</Tr>
<Tr>Accepted|result_rule 具名核验|待验收</Tr>
</Table>
<Choice name="view" label="查看" options="交接依据|验收条件" value="交接依据"/>
<Text muted>输入进入模型请求，不等于下游产物已经通过验收。</Text>
</Card>
```

## 示例 4 · 日程修改与外部效果

本地控件状态不是日历写入或通知回执。场景数据全部为虚构。

![日程修改与外部效果，由 Mimi 原生渲染器生成](../../assets/genui/schedule-preview.svg)

对应的 `mimi-ui/1` 组件输入：

```mimi-ui
<Card title="日程改期 · 操作预览" sub="示例工作空间 · 尚未执行外部写入">
<Choice name="slot" label="备选时间" options="周四 10:00|周四 15:00|周五 11:00" value="周四 15:00"/>
<Slider name="mins" label="时长" min="15" max="90" step="15" value="45" unit=" 分钟"/>
<Row>
<Stat label="当前选择" value="{slot}"/>
<Stat label="会议时长" value="{mins} 分钟"/>
</Row>
<Checklist name="steps">
<Item done>已准备备选方案</Item>
<Item>写入日历</Item>
<Item>通知参会者</Item>
</Checklist>
<Text muted>当前只是方案预览。日历写入与通知须分别确认实际效果。</Text>
<Actions>
<Button copy="当前改期方案：{slot}，{mins} 分钟。尚未更新日历。">复制方案</Button>
</Actions>
</Card>
```

## 两类流程图

第五部分 [5.3 结果交接流程](../../../parts/05-evidence-and-delivery.md#53-从结果入账到下游产物验收) 说明 ResultCapsule、Durable、Routed、Consumed 与具名验收。另一组 [GenUI 交互流程](README.md#genui-在交付中的交互流程) 区分 `render_ready`、`local_interactive`、`action_ready` 和可信宿主的业务效果门禁。两幅图对应不同的治理对象，不应合并成一条强制的顺序流程。
