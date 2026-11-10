# 2026-11-11 · 组合候选源码接线核查

[架构](../002-architecture.md) · [上下文](../003-context-and-memory.md) · [执行](../004-execution-and-evidence.md) · [审查](../005-review-and-conformance.md)

<a id="followup-sources"></a>

## 后续源码核查：canonical 开发根与局部证据

本页保留首轮 `77c853f1` / `31fd6f75` 记录，以下为同一主题的后续补充，不另建可变工程账本。当前 assisthub 构造固定 `5e460e04a30a9c2625a252736d443692f6074e86`，合入 GenUI `7bfca12cdfe3c02534443c0222b0923e13aeb469` 与修复 c291 后端。读取源码及当前指南，关键判断核对调用方、接收方与状态；不是全仓审计。新集成和产品发布未 main 合并、未部署为总控给定状态，本轮不操作 Git、不查远端 PR/CI、不接触生产。

开发根 `core/`、`adapters/`、`deploy/` 与 `frontend/` 为当前源码入口；下文旧发布快照的 `backend/` 路径保留其历史身份。最终产品配对发布 SHA 尚待 root 固定。公开页面只使用仓库相对路径与提交，不包含私有配置、原始会话或本机路径。固定 GitHub 链接指向私有实现仓，需要权限；读者无法访问源码时，仍可阅读本仓的职责解释，但不能因此独立复验私有实现。

| 核查主题 | 固定源码（assisthub） | 定向覆盖 |
| --- | --- | --- |
| 开发/发布布局 | [README.md](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/README.md) | 开发根、唯一 frontend、incoming 历史与发布映射 |
| 原始领域边界 | [docs/architecture/LEAN_CORE.md](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/docs/architecture/LEAN_CORE.md) | Core 单写者、外部适配器与 named interfaces |
| 产品宿主 | [deploy/mimi_cli/mimi_product_runtime.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/mimi_cli/mimi_product_runtime.py) | Core/P6、kernel、UI 生命周期；继承前次固定接线 |
| Core 版本 | [core/assisthub_core/contracts.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/core/assisthub_core/contracts.py) | CONTRACT_VERSION 1.0 / SCHEMA_VERSION 42 |
| 可信 SSE | [frontend/server/features/target_role/feature.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/server/features/target_role/feature.py) | TrustedObservation.publish / SessionProxy；原生身份归并 |
| Core UI 投影 | [deploy/hermes/ui26_blocks.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/hermes/ui26_blocks.py) | observe / get / history / control；版本摘要、短锁、事务外 Node 与重新授权 |
| 精确保存身份 | [deploy/hermes/ui26_message_identity.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/hermes/ui26_message_identity.py) | saved_identity / project_identity；chat_identity.v1 与原生行元数据 |
| 认证读路径 | [frontend/server/features/gu_renderer/feature.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/server/features/gu_renderer/feature.py) | blocks、history 与 state 的现有认证路由 |
| 重启原生来源 | [frontend/server/shared/ui26_host.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/server/shared/ui26_host.py) | NativeMessageSource、具名 missing-run 404 与保存行终态证明 |
| 共享增量正文 | [frontend/web/shared/genui/blocks.js](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/web/shared/genui/blocks.js) | createIncrementalParser append/full 与有序 segments |
| 草稿和确认 | [frontend/web/shared/genui-state.js](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/web/shared/genui-state.js) | createBlockStore、bindIdentity、restore、captureDraft / ackDraft |
| 解析与 App | [frontend/web/shared/genui/renderer.js](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/web/shared/genui/renderer.js) | createMarkupParser、guMorphWork、iframe 固定锚点与沙箱 |
| frame 调度 | [frontend/web/features/gu_renderer/feature.js](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/web/features/gu_renderer/feature.js) | requestPreparation / requestFrame / flushWork、maybeMaterialize、dispose |
| 确认动作队列 | [frontend/web/features/gu_actions/actions.js](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/frontend/web/features/gu_actions/actions.js) | 草稿提交屏障、Core state revision 与动作回执 |
| 实际依赖输入 | [deploy/hermes/plugins/mimi_orchestration/runtime.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/hermes/plugins/mimi_orchestration/runtime.py) | mimi_dependency_result/1、basis 与必需输入 |
| 请求消费证据 | [deploy/hermes/plugins/mimi_orchestration/input_adapter.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/hermes/plugins/mimi_orchestration/input_adapter.py) | prepare/final request、trace 与响应观察；继承接线 |
| Core 备份 | [core/assisthub_core/backup.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/core/assisthub_core/backup.py) | snapshot、Memory fence、SQLite backup、blobs 与 manifest |
| 恢复边界 | [deploy/mimi_cli/recovery.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/mimi_cli/recovery.py) | core_only 默认阻止激活、七域 ports 与 full readiness |
| 更新边界 | [deploy/mimi_cli/update.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/mimi_cli/update.py) | ownership、full closure gate、synthetic_core 与普通 switch blocked |
| 安装操作说明 | [deploy/mimi_cli/README.md](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/mimi_cli/README.md) | 安装/doctor/offline recovery/update 的范围与未验项 |
| P6 恢复 | [core/assisthub_core/skills_release/service.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/core/assisthub_core/skills_release/service.py) | execute / recover / _finish；未知锁与只读回恢复 |
| nonce 验证 | [adapters/secretary_school/turn_auth.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/adapters/secretary_school/turn_auth.py) | TurnVerifier.verify、consume 与进程内有界 cache |
| ASR scope 路由 | [deploy/mimi_cli/ui26_asr_authority.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/mimi_cli/ui26_asr_authority.py) | NativeASRScopeVerifier.require_scope 复用已有 verifier 与 clock |
| 媒体 verifier | [deploy/mimi_cli/mimi_media_features.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/deploy/mimi_cli/mimi_media_features.py) | MimiMediaVerifier 保留 enterprise_verifier 实例 |
| spool 提交 | [adapters/spool/spool.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/adapters/spool/spool.py) | drain / _drain；per-source flock、FIFO、精确 ACK 和原文件身份 |
| spool 等待所有权 | [adapters/spool/deadline.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/adapters/spool/deadline.py) | timed_drain；等待超时不取消 callback、迟到 ACK 与 lease 生命周期 |
| UI 源码测试 | [core/tests/test_ui26_genui_a.py](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/core/tests/test_ui26_genui_a.py) | 重开 repository、保存身份冲突/失败粘性测试；本轮未执行 |

GenUI 设计动机与固定接口另对照 [2026-11-07 streaming rendering 计划](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/docs/plans/2026-11-07-genui-streaming-rendering.md)；计划中的目标不自动成为验收。增量、草稿与 App 新修复代码也只读对照了 GenUI `7bfca12` 工作树，源码身份与旧 WK manifest 分开。

### 总控证据的精确读取范围

- [candidate-c3-observations.json](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/docs/reports/2026-11-11-audit/candidate-c3-observations.json)：读取 `normal_official_canary_followup` 与 `official_child_followup` 两次独立功能通过，保留原 canary 模块根不匹配失败、c3 convergence 失败和 overall UNVERIFIED。前者 2 次 HTTP 200 与 fresh restart，后者 2 tasks / 2 attempts、验证依赖、HTTP progress、关闭后持久读回及 6 次 HTTP 200，含 A/C 各自 bound 请求。SDK early-close 使 child reported model / usage / cost UNKNOWN，不能声称每个供应商身份均被验证。迁移节只证明隔离真实旧库快照 schema 18→42，不是生产变更或完整 blobs 恢复。
- [genui-wkwebview-foreground.json](https://github.com/mor765504-gif/assisthub/blob/5e460e04a30a9c2625a252736d443692f6074e86/docs/reports/2026-11-11-audit/genui-wkwebview-foreground.json)：读取六组前台 native WK replay，硬件 M6 / 12 核 / 16GiB，p95 event→DOM 12–18ms / active job 2ms。固定 manifest `acfb1837be9828c68c6371314607fc29aac2cb3ebe1f8f7f08c47146cc639127` 属较旧 scoped candidate，普通产品新 App 修复仍 native acceptance pending；fixture 连续性不能替代新修复或真实模型测试。

总控回读 c291 完整 CI run `42904611343` 为 FAIL：两个 mail-watch 夹具只返回 status，缺少真实 Core 回执字段。修正后的夹具与延迟 UI 物化检查，在源码和隔离安装确认中各执行 173 项通过；后续固定版本完整 CI 仍须另行接受。生产仍为旧 Core 18 / 旧 gateway。最新源 CI、普通 App 原生验收、最终配对发布版本及正式部署只能在 root 获得相应新证据后更新，不能由源码、worker 声明或旧局部通过推断。局部证据详见[审查导读](../005-review-and-conformance.md#followup-evidence)，技术流见[架构](../002-architecture.md#canonical-layout)、[增量视图](../003-context-and-memory.md#incremental-ui)与[恢复所有权](../004-execution-and-evidence.md#recovery-ownership)。

本轮执行文档检查、链接/锚点核对与变更 Mermaid 的 headless 渲染/视觉检查，私有逐文件摘要和渲染产物留在本地，不进入发布清单。历史许可证、研究、归档和既有接受范围未改。

## 历史快照 · 版本与核查方式

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

## 历史补充 · 31fd6f75 与原已安装模块（2026-11-11）

上述文档源码审阅范围保持不变。总控随后对组合候选实际运行回归，先保留`77c853f1`上的失败：compiled target计数、安装白名单和既有业务域断言不一致。修复提交`31fd6f75`仅调整对应检查与CI源码接缝，并清理审批模块末尾空行；没有更改运行语义。

修复后Python3.12.16、固定Hermes版本的31文件组合为386 passed、89 subtests、4 skipped，完整安装6项通过。四项skip仍要求prepared kernel，未当作通过；原生补充夹具和依赖缺口仍保留。范围与原失败见[私有实验仓证据](https://github.com/mor765504-gif/assisthub/blob/51a25deb3adfefe3bdd0d96e0dcabae8b35780fd/docs/reports/2026-11-11-audit/README.md)，具体修复见[固定提交](https://github.com/mor765504-gif/Mimi-Superagent/commit/31fd6f75)。这些检查不构成完整产品接受。

另外，总控在原已安装模块的隔离home执行真实官方DeepSeek主控/Worker A→C，两个结果verified且C自动续派，驱动退出0、模型未mock。该次运行不部署本组合，也不证明生产网页收单、其他profile或新结果消费逻辑通过。[脱敏回执](https://github.com/mor765504-gif/assisthub/blob/51a25deb3adfefe3bdd0d96e0dcabae8b35780fd/docs/reports/2026-11-11-audit/installed-official-canary.json)。原安装源码无可读Git HEAD，整体部署版本保留UNKNOWN；文件匹配范围单列，不能由少量文件推断整套版本。
