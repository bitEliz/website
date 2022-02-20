import ProjectGridItem from "../../components/ProjectGridItem.vue"
import { ListGroup, MDL_ID } from "../../types/list-group"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons-vue"
import { computed, ComputedRef, defineComponent, ref, watch } from "vue"
import { useBreakpoints, useFetch } from "../../composables"
import Markup from "../../components/markup"
import Loading from "../../components/Loading.vue"
import fluent from "../../types/fluent"
import { Avatar, Row, Col, List, ListItem } from "ant-design-vue"

import "./style/index.less"

const Resume = defineComponent({
  setup() {
    const { result, isLoading } = useFetch(`/api/users/${import.meta.env.VITE_API_USER}/resume`)

    const user: ComputedRef<fluent.User | undefined> = computed(() => result.value)

    const activeKey = ref("0")

    const mdles = computed(() => _getMdles(result.value))
    const _getMdles = (arg?: fluent.User) => {
      const result: ListGroup<any>[] = []

      if (!arg) {
        return result
      }

      result.push(new ListGroup(MDL_ID.PROFILE, "简介", [arg]))

      const PROJ_VISIBILITY_PUBLIC = "public"

      // Filter visible projects
      const repositories = arg.projects?.filter(
        (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.isOpenSource == true
      )
      const apps = arg.projects?.filter(
        (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.isOpenSource == false
      )

      const proj: ListGroup<fluent.Project>[] = []
      if (repositories?.length) {
        proj.push(new ListGroup(MDL_ID.DEFAULT, "开源项目", repositories))
      }

      if (apps?.length) {
        proj.push(new ListGroup(MDL_ID.DEFAULT, "精选项目", apps))
      }

      if (proj.length) {
        result.push(new ListGroup(MDL_ID.PROJECT, "项目", proj))
      }

      const exp: ListGroup<any>[] = []
      exp.push(new ListGroup(MDL_ID.EXPERIENCE, "工作经历", arg.experiences))
      exp.push(new ListGroup(MDL_ID.EDUCATIONAL, "教育经历", arg.education))
      result.push(new ListGroup(MDL_ID.EXPERIENCE, "经历", exp))

      result.push(new ListGroup(MDL_ID.SKILL, "技能", arg.skill!.professional))

      return result
    }

    const fullName = computed(() => {
      const lastName = result.value?.lastName ?? ""
      const firstName = result.value?.firstName ?? ""
      return lastName + firstName
    })

    const { lessThanOrEqual } = useBreakpoints()
    const isLessThanOrEqualSmall = lessThanOrEqual("sm")

    const meta = computed(() => ({
      title: result.value?.username?.toUpperCase()
    }))

    watch(meta, (n, o) => {
      if (n.title != o.title && document) {
        document.title = n.title + " - RESUME"
      }
    })

    const projectNode = (mdl: ListGroup<ListGroup<fluent.Project>>) =>
      // Split project to multiple group.
      mdl.list.map((g) => (
        <div class="project__list-wrapper">
          {
            <List
              class="project__list"
              grid={{ gutter: 16, column: 3, xs: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
              dataSource={g.list}
              renderItem={(item: any) => (
                <ListItem class="project__list-item">
                  <ProjectGridItem data={item} />
                </ListItem>
              )}
            ></List>
          }
        </div>
      ))

    const profileNode = (mdl: ListGroup<fluent.User>) => (
      <Row align="middle" gutter={64}>
        <Col class="profile__me">
          <Avatar class="profile__avatar" src={mdl.list[0].avatarUrl} alt="user avatar"></Avatar>
          <h1>{fullName.value}</h1>
          {
            // Build social networking services node if user data contains social networking services.
            mdl.list[0].social && (
              <Row align="middle" justify="center" gutter={16}>
                {
                  // Build social networking service node.
                  mdl.list[0].social.map((e: fluent.SocialNetworking) => (
                    <Col key={e.id}>
                      <a href={e.service?.name === "Mail" ? "mailto:" + e.url : e.url}>
                        <i
                          class={"ali " + e.service?.name?.toLowerCase()}
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </a>
                    </Col>
                  ))
                }
              </Row>
            )
          }
        </Col>
        <Col class="profile__about">
          <Markup src={user.value?.aboutMe}></Markup>
        </Col>
      </Row>
    )

    const experienceNode = (mdl: ListGroup<ListGroup<any>>) => (
      <Row gutter={32}>
        {
          //
          mdl.list.map((m) => (
            <Col span={12} style={{ minWidth: "400px" }}>
              <ul class="exp__list list--unstyled">
                <h1>{m.title}</h1>
                {
                  // Build experience list item.
                  m.list.map((exp) =>
                    m.id == MDL_ID.EXPERIENCE ? (
                      <li>
                        <h4>{exp.companyName + " • " + exp.title}</h4>
                        <time
                          style={{ marginBottom: "0.5rem" }}
                          datetime={exp.startDate + "/" + exp.endDate}
                        >
                          {exp.startDate + " - " + exp.endDate}
                        </time>
                        {exp.responsibilities && (
                          <ul class="list--circle-inside">
                            {exp.responsibilities.map((responsibility: string) => (
                              <li>{responsibility}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ) : (
                      <li>
                        <h4>
                          <i class="ali degree icon" />
                          {exp.field + " • " + exp.degree}
                        </h4>
                        <time
                          style="margin-bottom: 0.5rem"
                          datetime={exp.startYear + "/" + exp.endYear}
                        >
                          {exp.startYear + " - " + exp.endYear}
                        </time>
                        <h5>{exp.school}</h5>
                      </li>
                    )
                  )
                }
              </ul>
            </Col>
          ))
        }
      </Row>
    )

    return () => {
      return isLoading.value ? (
        <Loading />
      ) : (
        <div id="__cv">
          <main>
            {
              // Build sections using organized mdl data.
              mdles.value.map((mdl) => (
                <section id={mdl.id} key={mdl.id} class={mdl.id}>
                  <div class="section__wrapper">
                    {mdl.id != MDL_ID.PROFILE && mdl.id != MDL_ID.EXPERIENCE && (
                      <h1>{mdl.title}</h1>
                    )}
                    {mdl.id == MDL_ID.PROFILE && profileNode(mdl)}
                    {mdl.id == MDL_ID.PROJECT && mdl.list && projectNode(mdl)}
                    {mdl.id == MDL_ID.EXPERIENCE && experienceNode(mdl)}
                    {mdl.id == MDL_ID.SKILL && (
                      <ul class="list--unstyled">
                        {mdl.list.map((e) => (
                          <li>
                            <Markup src={e}></Markup>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))
            }
          </main>
        </div>
      )
    }
  }
})

export default Resume
