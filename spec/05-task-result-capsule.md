[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](04-context-envelope.md#mgrs-4) · [下一章](06-task-discipline.md#mgrs-6)

<a id="mgrs-5"></a>

## 5. 任务与团队交接合同 Task / ResultCapsule

受管任务至少绑定 goal、context_refs、result_rule、execution_profile_ref、environment_ref、resource_claims、dependency edges；沿用现有 submit_plan/amend_task/append_context。不要将开发控制台的 C0 角色硬编码成所有消费者的身份。

每个可消费结果增加规范的“结论胶囊”投影，优先使用现有结果/材料字段，不立即增设第二套数据库：

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

必需字段的内容由实际已执行结果产生，不能用生成的 JSON 自动授予 verified。接收方检查授权、任务版本、结果有效性，再读取必要证据原件。一个接收方的上下文窗口不必复制全部上游聊天。

四个回报层级分别说明结果到了哪一步。

- Durable: 结果已持久入账，属于正确 attempt。
- Routed: 路由到正确授权接收者，会话标识可追溯。
- Consumed: 已包含在最终模型请求并观察到相应响应；仅证明确实被送达。
- Accepted: 后继产物满足已声明的具名检查，冲突与未解决问题按合同保留。

不能把前三级自动晋级为第四级。复杂研究/财务结论的接受标准依赖该任务自己的证据与复核规则，不由固定 exact-summary checker 代替。对 Worker 自我评价和独立验收分开记账。未知原生效果或缺失凭据的失败保持受阻，不无限重跑整包。
