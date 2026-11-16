[协议索引](../MGRS.md) · **MGRS 0.1 治理准则** · [上一章](03-invariants.md#mgrs-3) · [下一章](05-task-result-capsule.md#mgrs-5)

<a id="mgrs-4"></a>

## 第四条 · 三维委托与上下文信封（ContextEnvelope）

### 4.1 区分上下文的四个客观层次

长期运行的个人 Agent 之所以容易出现“记错偏好”“忽略刚刚改过的要求”或“泄露跨身份信息”，根本原因在于系统把所有文本混为一谈。MGRS 要求严格区分上下文的四个层次：

1. **系统保存了什么**：分散在 `Core`、原生会话、任务系统与外部文件中的全部历史记录；
2. **当前允许知道什么**：在当前可信身份、`Profile`、`scope` 与 `authorization_generation` 边界内有效且未被撤回的数据；
3. **本轮投影选择了什么**：在有限上下文预算（如单轮记忆抽屉 2000 字符上限）内按相关性与重要性选出的条目；
4. **最终真正送入了什么**：连同当前任务要求版本、必需上游结果与人格语境一起进入本次模型请求的实际内容。

`ContextEnvelope` 是宿主侧的**请求级治理记录**，将每一次模型请求的身份边界、来源版本、选择与实际装配依据关联起来。`mgrs-context/1` 保留以下字段。宿主保存审计元信息，模型只收到本轮需要的已授权文字和引用，通用日志不收录私人原文。

~~~json
{
  "schema": "mgrs-context/1",
  "identity": {
    "principal_ref": "host",
    "profile_ref": "authorized-profile",
    "session_ref": "native-session",
    "authority_generation": 0
  },
  "turn": {
    "logical_turn_id": "host-turn",
    "task_id": null,
    "requirement_revision": null,
    "query_digest": "sha256"
  },
  "sources": {
    "memory_scope_revisions": {},
    "persona_manifest_digest": "sha256",
    "skills_manifest_digest": "sha256",
    "task_result_refs": []
  },
  "selection": {
    "required_refs": [],
    "selected_optional_refs": [],
    "omitted": [],
    "rendering_digest": "sha256"
  },
  "budget": {
    "dynamic_character_cap": 2000,
    "estimated_tokens": null
  }
}
~~~

### 4.2 授权过滤与预算省略的严格边界

**授权与有效性过滤。** 事实来源按当前身份、`scope`、对象授权及到期时间提供有效快照。已撤回、过期、仅作历史留存和无权读取的条目在排序前排除。权限机制记录其自身可见的过滤原因与必要计数，未经授权对象的标识和原文留在访问边界内。`identity.authority_generation` 记录本请求所依据的授权代次，C1 受管路由的代次来自 `authorization_generation`。

**必需任务输入。** 当前可信指令、宿主授权规则和任务合同决定哪些要求与上游结果必须进入请求。受管任务通过 `InputAdapter` 装配这些输入，直接关联任务版本，与可选记忆分别计量。必需材料超出模型窗口时，在保留约束含义的前提下压缩表述、按引用分段回读或标明受阻。模型和外部材料中的自述无权将可选条目标为必需。

**可选事实与预算省略。** `mimi_memory` 将 Core 当前事实按实体、路径或任务标识命中度、当前语境相关度、重要性与非重复度排序。中文查询支持可测试的字词片段或别名。更新时间用于同一对象的版本与时效判断，久未召回本身不构成降权依据。首版事实抽屉按 **2000 字符**计量，覆盖渲染后的正文与必要标记。入选事实须可回查 `scope`、`subject_key`、版本及 `source_ref`。预算省略的已授权候选按原因记入 `selection.omitted`，宿主向模型提示视图的覆盖范围，后续可按当前授权回读。

### 4.3 会话压缩与缓存更新纪律

同一逻辑轮内复用装配缓存时，核对主体、账户、Profile、会话、授权代次、查询摘要、任务修订、相关 scope 版本、Persona 与 Skill 清单摘要、投影策略版本及有效期。用户修订要求、关键依赖结果更新、授权撤回或到期时，重新装配受影响内容。一次读取只更新使用记录，Core 事实版本由真实事实变化推进。

Hermes 原生 `ContextCompressor` 管理历史和窗口，保留消息与工具回报的配对及原会话回查路径。`mimi_tavern` 装配 Persona 版本与场景；原生 Skill 目录列出按权限可见的方法，模型选定后再读取批准版本的正文。受管输入通过 `request_included` 和 `step_observed` 分别记录实际请求包含和关联响应。若请求中只有材料引用，确认阅读原件还需对应的读取依据。

冷启动时先核验当前身份与授权，恢复原会话、任务及未决操作，再从有效快照和原件引用重建本轮输入。对外可读的 `memory.md` 或 `context.json` 提供带版本与来源的只读视图。人工修订长期事实经 Core 的受权更新或撤回接口核对预期版本（CAS）。
