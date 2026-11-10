# 2026-11-11 · 组合候选源码接线核查

[架构](../002-architecture.md) · [上下文](../003-context-and-memory.md) · [执行](../004-execution-and-evidence.md) · [审查](../005-review-and-conformance.md)

## 版本与核查方式

本次从产品源码工作树只读核查，Git HEAD 为 `77c853f1431313cc2ff2ce30682c0c1eb82b896f`，读取时工作树干净。基线为 `1dd86db66894ecabcd518be1e5cb1aac8d9fc462`，叠加 PR #17 `2ef4555d3e28c4c5de454eb3ace7b71c02bec880` 与 PR #19 `1682f28d6284a4e1ceea9fc087c21d56b82d709e`。组合候选尚未接受、合并或部署，该状态来自本轮总控给定的任务基线。本次没有查询 GitHub 实时 PR 状态。

下表固定链接提供代码定位。产品仓为私有仓，访问需要相应 GitHub 权限；公开 MGRS 文档只保留可讨论的技术关系和来源引用。源码路径为仓库相对路径。

## 实际读取的来源与覆盖

| 主题 | 固定源码 | 本轮观察范围 |
| --- | --- | --- |
| 宿主装配与关闭 | [backend/deploy/mimi_cli/mimi_product_runtime.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/mimi_cli/mimi_product_runtime.py) | 同 Core release factory、Skill 绑定、runner/Workshop 装配与关闭顺序 |
| Skill 发布与读取 | [backend/deploy/mimi_cli/mimi_skill_features.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/mimi_cli/mimi_skill_features.py) | SkillRuntime、NativeBinding、native_read、ManagedSkillReader 与受管写防护 |
| Skill 原生入口 | [backend/deploy/hermes/plugins/mimi_skills/__init__.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_skills/__init__.py) | skills_list / skill_view override、pre_tool_call 与 pre_llm_call |
| 记忆 provider | [backend/deploy/hermes/plugins/mimi_memory/provider.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_memory/provider.py) | 当前快照刷新、query 生命周期、写后读回隔离、selection_report |
| 记忆选择 | [backend/deploy/hermes/plugins/mimi_memory/projection.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_memory/projection.py) | 跨 scope 词法排序、2000 字符投影与省略报告 |
| Core 记忆权威 | [backend/core/assisthub_core/context.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/core/assisthub_core/context.py) | 有效快照、版本与显式变更边界；本轮以 provider 调用关系为主 |
| Persona engine | [backend/deploy/hermes/plugins/mimi_tavern/engine.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_tavern/engine.py) | 压缩继承、会话边界、clone、报告清理与降级 |
| Persona session | [backend/deploy/hermes/plugins/mimi_tavern/runtime.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_tavern/runtime.py) | bundle 内容身份、workspace、select 与 compiled 报告 |
| Persona 编译 | [backend/deploy/hermes/plugins/mimi_tavern/compiler.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_tavern/compiler.py) | 请求插槽与预算；本轮仅核对编译报告入口 |
| 网关与授权 | [backend/deploy/hermes/plugins/mimi_orchestration/gateway.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/gateway.py) | HostPolicy、当前 turn dispatch、恢复 scope、start_gateway 装配 |
| 任务权威 | [backend/deploy/hermes/plugins/mimi_orchestration/runtime.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/runtime.py) | 依赖输入、basis、版本、投影、准入、取消/恢复与 action 对账 |
| 请求消费 | [backend/deploy/hermes/plugins/mimi_orchestration/input_adapter.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/input_adapter.py) | journal inbox、prepare/final request、响应 trace 与缺失输入 |
| 原生请求接线 | [backend/deploy/hermes/patch_hermes_orchestration_input.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/patch_hermes_orchestration_input.py) | prepare_request、final_request 与 observe_response 的 patch 接点 |
| 执行路由 | [backend/deploy/hermes/plugins/mimi_orchestration/executor_router.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/executor_router.py) | 按持久 binding 选择 adapter，deliver/stop/recovery 转发 |
| 持久原生执行 | [backend/deploy/hermes/plugins/mimi_orchestration/native_executor.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/native_executor.py) | 持久绑定先于启动、幂等 attempt、journal、重放与 observe |
| Hermes bridge | [backend/deploy/hermes/plugins/mimi_orchestration/native_bridge.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/native_bridge.py) | 原生 delegate 子执行、approval scope、stop、receipt 与 quiet 的区别 |
| 审批分发 | [backend/deploy/hermes/plugins/mimi_orchestration/approval_runtime.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/approval_runtime.py) | 插件内共享 ContextVar 与子任务审批 scope |
| process 生命周期 | [backend/deploy/hermes/plugins/mimi_orchestration/process_bridge.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/hermes/plugins/mimi_orchestration/process_bridge.py) | 受管进程与恢复入口；本轮仅定向读取生命周期符号 |
| 有界网关部署 | [backend/deploy/gha/mimi-vnext-deploy.sh](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/gha/mimi-vnext-deploy.sh) | payload 白名单、停服前 staged preflight、备份、drain、安装、金丝雀及回滚 |
| 完整分发清单 | [backend/deploy/mimi_cli/payload.py](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/deploy/mimi_cli/payload.py) | ProductRuntime、Skill 插件与记忆/Persona 插件的分发边界 |
| 既有实施记录 | [docs/plans/2026-11-10-context-governance-wiring.md](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/docs/plans/2026-11-10-context-governance-wiring.md) | PR #17 范围、历史通过和失败、分发与环境限制 |
| 现行工程入口 | [backend/docs/program/NEXT.md](https://github.com/mor765504-gif/Mimi-Superagent/blob/77c853f1431313cc2ff2ce30682c0c1eb82b896f/backend/docs/program/NEXT.md) | 11 月 10 日接线与审批打包候选，历史接受/部署边界 |

组件 README 和实施记录用于理解范围，关键链路以调用方、接收方和持久状态交叉核对。此清单是文件/主题级覆盖记录，定向阅读与完整逐行审计分别保留口径。Core 全部业务接口、全部工具、前端、Hermes 全源码、私有配置、Persona 内容及生产现场均未作穷尽审计。

## 本轮可支持的结论

- ProductRuntime 复用既有 Core、Hermes loop、P6 与任务账本。Context、Persona、Skill 与结果请求证据有各自所有者，002 至 004 的图表分别说明职责流、调用和状态。
- 记忆选择基于本轮 query 和当前有效授权快照，Persona 报告止于 compiled，Skill 读取通过实时发布/授权检查。完整 ContextEnvelope 与语义效果仍按规范逐项核对。
- 上游结果成为下游必需输入后，保存、排队、最终请求包含、响应观测和具名 verifier 分别取证。外部 process 的必需输入消费当前受能力限制。
- 取消意图、执行结束、quiet、修复、重试和恢复有不同状态。持久 timeout 或缺少 live binding 保留未知，未据此推导可以重复执行。
- PR #19 的 staged preflight 位于网关部署的 drain/停服前，部署 payload 有界。完整产品安装、真实配置启用和当前候选部署各自需要对应证据。

## 历史证据与未覆盖项

11 月 9 日的源码、CI 和旧版本部署记录继续见[历史基线](2026-11-09-system-baseline.md)，原有接受范围不被此次文档编辑改写。

PR #17 实施记录记载本地受控套件 `256 passed, 85 subtests passed`，另一个有重叠的执行/安装套件 `105 passed, 4 subtests passed, 5 skipped, 6 deselected`。记录还保留首次 context CI 的四项 fixture 失败及修复说明、早期内核依赖缺失、AF_UNIX 环境限制和私有人格迁移材料缺失。这些数字来自既有报告，本次没有重跑，也未据此接受组合候选。最终 CI 与总控后续新证据应固定实际执行 SHA 后再补入。

本轮仅运行文档归档、链接与 Mermaid 渲染检查，结果交回总控。产品回归、真实 provider、设备、24 小时运行、硬重启及生产 API 收单均未在本轮执行。源码存在、历史受控通过、当前接受、合并和部署分别记录。

公开材料不包含私有宿主地址、配置值、凭据、完整 Persona、数据库或原始会话。检查报告留在本地回执，由总控负责 Git 发布与最终集成。

<a id="actual-verification"></a>

## 总控补充的实际验证（2026-11-11）

上述文档源码审阅范围保持不变。总控随后对组合候选实际运行回归，先保留`77c853f1`上的失败：compiled target计数、安装白名单和既有业务域断言不一致。修复提交`31fd6f75`仅调整对应检查与CI源码接缝，并清理审批模块末尾空行；没有更改运行语义。

修复后Python3.12.16、固定Hermes版本的31文件组合为386 passed、89 subtests、4 skipped，完整安装6项通过。四项skip仍要求prepared kernel，未当作通过；原生补充夹具和依赖缺口仍保留。范围与原失败见[私有实验仓证据](https://github.com/mor765504-gif/assisthub/blob/51a25deb3adfefe3bdd0d96e0dcabae8b35780fd/docs/reports/2026-11-11-audit/README.md)，具体修复见[固定提交](https://github.com/mor765504-gif/Mimi-Superagent/commit/31fd6f75)。这些检查不构成完整产品接受。

另外，总控在原已安装模块的隔离home执行真实官方DeepSeek主控/Worker A→C，两个结果verified且C自动续派，驱动退出0、模型未mock。该次运行不部署本组合，也不证明生产网页收单、其他profile或新结果消费逻辑通过。[脱敏回执](https://github.com/mor765504-gif/assisthub/blob/51a25deb3adfefe3bdd0d96e0dcabae8b35780fd/docs/reports/2026-11-11-audit/installed-official-canary.json)。原安装源码无可读Git HEAD，整体部署版本保留UNKNOWN；文件匹配范围单列，不能由少量文件推断整套版本。
