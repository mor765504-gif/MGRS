[返回 MGRS 六部分索引](../MGRS.md) · 第三部分 / 六

<a id="part-3"></a>

# 第三部分 · 决策、规划与协作编排

模型能够在 Harness 内选择完成目标的方法。MGRS 不规定模型必须先想几轮、使用什么内部推理结构；它约束**一旦决策变成持续任务或多 Agent 分工，目标、授权、任务版本、依赖和验收责任怎样保持一致**。

## 什么时候需要受管任务

Hermes 继续承担原生 Agent Loop。当前请求能够简单回答或在授权内直接调用工具时，无需启动一套额外的 Planning 轮次，更不必常驻第二个审查模型。较长、需要分工或受管理资源的工作，才由现有 Mimi Orchestration 将其组成受管任务。

这里的 C0 是既有架构中协调和判断的角色，不是新增的万能 Supervisor；开发控制平面的 C0 也不能机械套成每位产品用户都必须经过的身份。

## 一项任务应有怎样的边界

| 字段或关系 | 要解决的问题 |
| --- | --- |
| goal、context_refs | 工作目标和真正有权使用的材料 |
| result_rule | 结果应满足哪些具名要求，不凭口头说已完成 |
| execution_profile_ref、environment_ref | 谁执行、在什么受限环境执行 |
| resource_claims | 哪些共享资源或写集可能冲突 |
| dependency edges | 下游依赖哪项上游结果、哪个要求版本 |
| task、requirement_revision、attempt | 持续任务、用户修改后的版本和每次尝试分开 |

例如两位 Worker 分别研究不同材料，第三位综合结论：后台不能仅因 A、B 都显示“完成”就认为第三位已经收到需要的证据。中途用户修改比较范围，旧版结果可以保留为历史材料，却不能未检查便继续满足新版要求。

Worker 只能得到这次任务必要的工具、资料和资源，不能继承主控的全套身份。C0 可以提出重试或修复建议，但不能改写上一次的真实回执，也不能为了交付而擅自降低原先的验收条件。

## 与后续环节的交接

第三部分形成可执行的任务合同和有界委派。真正的工具调用和外部效果进入第四部分；回报中的证据、接收者和验收进入第五部分；重启恢复、租约与历史状态始终由第六部分提供支撑。**这是一条可分叉的组织关系，不是所有用户指令必须依次经过的阶段。**

**正式约束：** [任务与 ResultCapsule](../spec/05-task-result-capsule.md#mgrs-5) · [任务纪律](../spec/06-task-discipline.md#mgrs-6) · [冲突裁决](../spec/15-conflict-and-change-control.md#mgrs-15) · [受限委派不变量](../spec/03-invariants.md#mgrs-3)。

**工程背景：** [主对话与工坊](../docs/002-architecture.md) · [任务交接](../docs/004-execution-and-evidence.md) · [11 月 11 日候选接线](../docs/sources/2026-11-11-integration.md)。协议示例不能当作已经完成的真实多 Agent 生产验收。
