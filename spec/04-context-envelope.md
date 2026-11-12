[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](03-invariants.md#mgrs-3) · [下一章](05-task-result-capsule.md#mgrs-5)

<a id="mgrs-4"></a>

## 4. 请求级治理合同 ContextEnvelope

宿主在可信入口绑定身份，从各项事实的权威来源取材。每轮选读哪些内容、使用哪个版本，均可沿这份请求级合同回查。抽屉提供按本轮需要计算的只读视图。

以下为 0.1 提议的合同结构。

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

宿主保存审计所需的元信息，交给模型的是完成当前任务所需的已授权文字与可调用引用。通用日志不得收录私人原文。

### 4.1 抽屉分工与装配权

A. 人物锚点：mimi_tavern 负责唯一 Persona 版本、场景、表达示例及其请求插槽。Persona 是人的持续设定，不存任务验收或外部作用。

B. 事实抽屉：mimi_memory 从当前 Core 快照选取稳定偏好与当前话题相关的事实。首版预算为 2000 字符，按确定性规则选择，无需为每轮选择另调模型。

C. 任务抽屉：当前用户修正、DAG 依赖与上游 ResultCapsule 来自现有任务系统，不与个人记忆争用普通 fact 配额。真正必需的用户修正仍走现有 InputAdapter。

D. 方法抽屉：只放 Skill 名称、功能边界与已批准版本。只有模型决定使用时才在原生 loader 读取完整 SKILL.md/引用/脚本；Tool schemas 由原生工具层提供。

E. 历史与原件：Hermes 原会话及原始材料存储，不强制全部进 Prompt；冷启动由稳定引用和实际来源恢复。

### 4.2 具体投影规则

先从允许读取的 scope 与对象版本中取得当前有效事实，再排除 withdrawn、historical、expired 和被撤权的内容。现有 Core 已做部分有效性检查，投影器仍需校验当前授权代次、到期时间及引用的可读性。

只有本轮真实用户要求、宿主授权规则与任务契约可以确定必需项，记忆文本中的标记不具备这项权限。必需项超出预算时，先保留含义、压缩表述；仍然超出时，分阶段读取、执行或报告受阻。

可选事实采用可解释的确定性排序。首版优先级：实体/路径/任务标识准确命中 > 当前语境相关度 > importance > 信息非重复度；updated_at 用于同一对象版本与时效判断，而不是覆盖真实来源。中文检索用可测试的字词片段/别名，不靠英文分词空格。禁止“距上次召回时间越长就永远得分越低”的自强化遗忘；公平只能在相同相关性的候选间做。

事实抽屉按字符计数。渲染时可采用 JSON 行或经过可靠转义的紧凑文本，必须保留或能回查 scope、subject_key、version、source_ref。宿主记录省略条目数与原因，并向模型标明本轮只包含部分事实。未选中的内容仍可依授权回查。模型生成的指令和外部网页中的指令均无权改变系统级约束。

缓存键：principal/account/profile/session + authority_generation + query_digest + task_revision + relevant scope_revision + persona/skill manifest digests + projector policy version。缓存取用还需检查时间有效期；仅靠 scope_revision 不足以捕捉定时到期。

同一逻辑轮为了缓存尽量维持稳定装配，授权撤销、到期、用户修正与已验证结果变化例外立即刷新。使用后只记录 selected/included/consumed 的不同证据，不为了记录一次读取而频繁改写 Core 事实版本。

### 4.3 压缩、滚动上下文与外置文件

不替换 Hermes 自有 ContextCompressor，不修改用户已调好的阈值或推理强度作为默认改造。保留请求/工具配对、稳定前缀、原始会话与历史检索。压缩不能作为执行外部操作或清空必需要求的授权。

冷启动恢复顺序：验证 profile/owner/权限 → 恢复原生会话/任务 ID → 读取持久任务和未决效果 → 对账旧 attempt/通知 → 获取记忆有效快照 → 编译 Persona → 投影本轮抽屉 → 继续相同逻辑任务。

外置 memory.md/context.json 可以提供可阅读视图，默认只读、带版本和来源。人工修改若要成为权威事实，应通过既有 Core upsert/withdraw + CAS，而不是双向自动覆盖数据库。
