[协议索引](../MGRS.md) · **MGRS 0.1 治理准则** · [上一章](04-context-envelope.md#mgrs-4) · [下一章](06-task-discipline.md#mgrs-6)

<a id="mgrs-5"></a>

## 第五条 · 任务契约与结果胶囊（Task & ResultCapsule）

### 5.1 受管任务契约与版本锁定

当工作需要持续管理要求版本、依赖、执行尝试或资源时，由 `submit_plan` 建立受管任务（`task_id`）。合同绑定用户目标（`goal`）、引用材料（`context_refs`）、具名验收条件（`result_rule`）、执行与环境标识（`execution_profile_ref`、`environment_ref`）、资源预约（`resource_claims`）、依赖边及当前要求版本。领域观察可按自身业务标识持续运行，一次轻量委派可由原生会话当场接回。

系统区分两类后续输入。

- **补充背景（`append_context`）**：在不改变目标与验收标准的前提下追加参考资料，保留原要求版本；新材料揭示的冲突按依据重新核查；
- **修订要求（`amend_task`）**：修改目标、时间窗口、关键约束或 `result_rule` 时，必须校验预期版本号（`expected_revision`）、递增 `requirement_revision`，标记受影响的旧结果与下游依据失效，保留原版本供回查。仍适用的原始材料可在新合同中继续引用。

### 5.2 结果胶囊（ResultCapsule）与四级交接状态

多角色协作或分阶段执行时，**结果胶囊（`ResultCapsule`）**从既有结果、材料和接收授权生成交接视图。每项结论带上证据、适用前提与未决问题，产物引用可定位到具体版本。接收者按自身当前授权回读原件。

~~~json
{
  "schema": "mgrs-result/1",
  "task_id": "T",
  "requirement_revision": 1,
  "attempt_id": "A",
  "result_id": "R",
  "producer_profile": "bounded-worker",
  "authorized_receiver": "resolved-by-host",
  "conclusions": [
    {
      "claim": "text",
      "evidence_refs": ["material:versioned"],
      "applicability": "scope or condition",
      "uncertainty": "unresolved issue if any"
    }
  ],
  "artifact_refs": [{"ref": "immutable-or-versioned", "digest": "sha256"}],
  "conflicts": [],
  "unresolved": [],
  "next_dependency_refs": []
}
~~~

一份结果从产生到真正生效，必须区分四个独立的交接层级，前三者绝不自动晋级为第四者：

1. **`Durable`（已持久入账）**：结果已关联正确的 `task_id`、`requirement_revision` 与 `attempt_id` 写入权威账本；
2. **`Routed`（已路由送达）**：结果引用已投递至获得授权的下游接收者或目标会话；
3. **`Consumed`（已进入请求）**：结果或规定的引用已实际纳入下游模型请求（`request_included`），并观察到关联响应（`step_observed`）。若送入的是引用，回读原件和正确解读内容各需自己的依据；
4. **`Accepted`（已通过验收）**：指定版本的产物通过任务合同声明的具名检查，冲突与未决问题按合同保留。生产者自评和验收结果分别记账，复杂判断依据任务要求核对原件。

### 5.3 下游何时可用未核验结果、何时必须等待验收

依赖边声明下游需要哪一种上游证据。调度器以任务账本中的实际结果与核验回执判定条件，并检查接收授权、要求版本与结果有效性。

- **`result_available`（结果可用）**。并行初筛、交叉比对、草稿汇总或独立复核可以接手已入账且版本匹配的结果。交接时明确标出已核实的部分与待核线索。下游如需根据某项结论采取外部行动，须另按该动作的前提核验结论与权限。
- **`result_verified`（结果已核验）**。当合同要求以某项已核实结论作为发送、发布或其他正式决定的前提时，必须取得与该上游结果及版本匹配的核验记录，才能解除依赖。新的下游产物仍按自己的 `result_rule` 验收。上游结果通过核验，仅满足这条依赖边声明的条件。

界面及结果投影从任务账本读取核验状态。模型生成的 JSON 或 `verified` 字样无法替代核验回执。
