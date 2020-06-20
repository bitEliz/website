<template>
  <div id="resume">
    <nav
      class="resume-navbar resume-navbar__expand-lg resume-navbar__dark bg-primary fixed-top"
      id="nav"
    >
      <a class="resume-navbar__brand" href="#resume">
        <span class="d-block d-lg-none">APPL</span>
        <span class="d-none d-lg-block">
          <img
            class="img-fluid img-profile rounded-circle mx-auto mb-2"
            src="@/assets/images/profile.jpg"
            alt
          />
        </span>
      </a>
      <button
        class="resume-navbar__toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="resume-navbar__toggler-icon"></span>
      </button>
      <div class="resume-navbar__collapse collapse">
        <ul class="resume-navbar__list" v-scroll-spy-active v-scroll-spy-link>
          <li class="resume-navbar__list-item" v-for="mdl in modules" :key="mdl.id">
            <a
              class="resume-navbar__link"
              :href="'#' + mdl.id"
            >{{ mdl.title }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="resume-wrap container-fluid" v-scroll-spy>
      <section v-for="mdl in modules" :key="mdl.id" :id="mdl.id">
        <div v-if="mdl.id === 'about'" class="resume-section__wrap">
          <h1 class="mb-0 display-2 font-weight-bold text-uppercase">
            {{ mdl.profile.firstName }}
            <span class="text-primary">{{ mdl.profile.lastName }}</span>
          </h1>
          <h4 class="mb-5">
            {{ mdl.profile.address + ' ' + mdl.profile.phone + ' · ' }}
            <a
              :href="'mailto:' + mdl.profile.email"
            >{{ mdl.profile.email }}</a>
          </h4>
          <p class="lead mb-5">{{ mdl.profile.intro }}</p>
          <div class="resume-social__list">
            <a
              class="resume-social__list-item"
              v-for="(app, index) in mdl.profile.socialAppList"
              :key="index"
              :href="app.href"
            >
              <appl-svg class="icon" :paths="app.svg"></appl-svg>
            </a>
          </div>
        </div>
        <div v-else-if="mdl.id === 'exp' || mdl.id === 'edu'" class="resume-section__wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <div
            class="d-flex flex-column flex-md-row justify-content-between"
            v-for="(exp, index) in mdl.expList"
            :key="index"
            :class="index === mdl.expList.length - 1 ? '' : 'mb-5'"
          >
            <div class="flex-grow-1">
              <h2 class="font-weight-bold mb-0">{{ exp.title }}</h2>
              <h4 class="mb-3">{{ exp.responsibility }}</h4>
              <p>{{ exp.description }}</p>
            </div>
            <div class="flex-shrink-0">
              <span class="text-primary">{{ exp.time }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="mdl.id === 'skill'" class="resume-section__wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <h4 class="mb-3">Programming Languages &amp; Tools</h4>
          <ul class="list-inline xxLang-list">
            <li
              class="list-inline-item"
              v-for="(skill, index) in mdl.skills.langAndToolList"
              :key="index"
            >
              <appl-svg class="icon" v-if="skill.svg !== undefined" :paths="skill.svg"></appl-svg>
              <a v-else class="font-weight-bold">{{ skill.title }}</a>
            </li>
          </ul>
          <h4 class="mb-3">Workflow</h4>
          <ul class="fa-ul mb-0">
            <li v-for="(workflow, index) in mdl.skills.workflowList" :key="index">
              <span class="fa-li"></span>
              {{ workflow }}
            </li>
          </ul>
        </div>
        <div v-else-if="mdl.id === 'int'" class="resume-section__wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <p
            :class="index === mdl.iList.length - 1 ? 'mb-0' : ''"
            v-for="(interest, index) in mdl.iList"
            :key="index"
          >{{ interest }}</p>
        </div>
        <div v-else class="resume-section__wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import svg from 'components/svg.vue';

export default {
  name: 'resume',
  components: {
    'appl-svg': svg,
  },
  data() {
    return {
      modules: [
        {
          id: 'about',
          title: 'about',
          isActive: true,
          profile: {
            firstName: 'CLARENCE',
            lastName: 'TAYLOR',
            address: '3542 BERRY STREET · CHEYENNE WELLS, CO',
            phone: '80810 · (317) 585-8468',
            email: 'NAME@EMAIL.COM',
            intro:
              'I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
            socialAppList: [
              {
                title: 'StackOverflow',
                href: '#',
                viewBox: '0 0 1024 1024',
                svg: [
                  {
                    fill: '#FFFFFF',
                    path:
                      'M709.4 622L318 539.4 301.6 618l391.4 82z m102-174L504.4 191.4l-51 61.6 307 256.6z m-62.4 79.4L386.4 358l-33.4 73L715.4 600zM652 64l-64 48 238.6 320.6 64-48z m41 656h-400v79.4h400z m79.4 160H213.4V640h-80v320h719V640h-80z',
                  },
                ],
              },
              {
                title: 'Twitter',
                href:
                  'https://twitter.com/messages/compose?recipient_id=1412947170&text=hi',
                viewBox: '',
                svg: [
                  {
                    fill: '#FFFFFF',
                    path:
                      'M923.2 289.6c0 354.4-232.8 609.6-575.2 620.8-144.8 11.2-244-32.8-332.8-99.2 99.2 11.2 232.8-21.6 298.4-88.8-99.2 0-155.2-56-188-132h88.8C125.6 556.8 58.4 490.4 58.4 380c21.6 11.2 44 21.6 88.8 21.6-77.6-44-121.6-188-66.4-276.8 99.2 110.4 220.8 210.4 421.6 220.8-56-220.8 232.8-332.8 354.4-188 56-11.2 88.8-32.8 132-56-11.2 56-44 88.8-88.8 110.4 44 0 77.6-11.2 110.4-32.8-10.4 44-54.4 88.8-87.2 110.4z',
                  },
                ],
              },
              {
                title: 'Facebook',
                href: '#',
                svg: [
                  {
                    fill: '#FFFFFF',
                    path:
                      'M756 6.848l0 150.848-89.728 0q-49.152 0-66.272 20.576t-17.152 61.728l0 108 167.424 0-22.272 169.152-145.152 0 0 433.728-174.848 0 0-433.728-145.728 0 0-169.152 145.728 0 0-124.576q0-106.272 59.424-164.864t158.272-58.56q84 0 130.272 6.848z',
                  },
                ],
              },
              {
                title: 'Github',
                href: '#',
                svg: [
                  {
                    fill: '#FFFFFF',
                    path:
                      'M512 12.672c-282.88 0-512 229.248-512 512 0 226.261333 146.688 418.133333 350.08 485.76 25.6 4.821333 34.986667-11.008 34.986667-24.618667 0-12.16-0.426667-44.373333-0.64-87.04-142.421333 30.890667-172.458667-68.693333-172.458667-68.693333C188.672 770.986667 155.008 755.2 155.008 755.2c-46.378667-31.744 3.584-31.104 3.584-31.104 51.413333 3.584 78.421333 52.736 78.421333 52.736 45.653333 78.293333 119.850667 55.68 149.12 42.581333 4.608-33.109333 17.792-55.68 32.426667-68.48-113.706667-12.8-233.216-56.832-233.216-253.013333 0-55.893333 19.84-101.546667 52.693333-137.386667-5.76-12.928-23.04-64.981333 4.48-135.509333 0 0 42.88-13.738667 140.8 52.48 40.96-11.392 84.48-17.024 128-17.28 43.52 0.256 87.04 5.888 128 17.28 97.28-66.218667 140.16-52.48 140.16-52.48 27.52 70.528 10.24 122.581333 5.12 135.509333 32.64 35.84 52.48 81.493333 52.48 137.386667 0 196.693333-119.68 240-233.6 252.586667 17.92 15.36 34.56 46.762667 34.56 94.72 0 68.522667-0.64 123.562667-0.64 140.202666 0 13.44 8.96 29.44 35.2 24.32C877.44 942.592 1024 750.592 1024 524.672c0-282.752-229.248-512-512-512',
                  },
                ],
              },
              {
                title: 'Wechat',
                href: '#',
                svg: [
                  {
                    fill: '#FFFFFF',
                    path:
                      'M960.862 621.881c0-128.796-122.159-233.206-272.851-233.206S415.16 493.086 415.16 621.881s122.159 233.206 272.851 233.206c33.442 0 65.473-5.152 95.081-14.562l93.804 41.448s-17.002-62.341-20.434-76.623c63.569-42.697 104.4-109.007 104.4-183.469z m-365.684-41.497c-21.305 0-38.575-17.271-38.575-38.575s17.271-38.575 38.575-38.575c21.305 0 38.575 17.271 38.575 38.575s-17.27 38.575-38.575 38.575z m184.695 0c-21.305 0-38.575-17.271-38.575-38.575s17.271-38.575 38.575-38.575c21.305 0 38.575 17.271 38.575 38.575s-17.27 38.575-38.575 38.575zM692.201 367.634c4.055 0 8.085 0.087 12.101 0.219-27.758-128.492-159.512-225.826-317.881-225.826-178.544 0-323.283 123.709-323.283 276.31 0 88.224 48.377 166.791 123.697 217.379-4.067 16.922-24.211 90.786-24.211 90.786l111.142-49.109c35.081 11.149 73.033 17.254 112.655 17.254 4.801 0 9.571-0.107 14.321-0.285-7.979-22.804-12.279-46.927-12.279-71.897 0-140.738 135.988-254.831 303.738-254.831z m-195.789-89.876c25.243 0 45.706 20.463 45.706 45.706s-20.463 45.705-45.706 45.705-45.706-20.462-45.706-45.705 20.464-45.706 45.706-45.706zM277.58 369.169c-25.243 0-45.705-20.462-45.705-45.705s20.463-45.706 45.705-45.706c25.243 0 45.706 20.463 45.706 45.706s-20.463 45.705-45.706 45.705z',
                  },
                ],
              },
            ],
          },
        },
        {
          id: 'exp',
          title: 'experiance',
          isActive: false,
          expList: [
            {
              title: 'Senior Web Developer',
              responsibility: 'Intelitec Solutions',
              time: 'March 2013 - Present',
              description:
                'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
            },
            {
              title: 'Web Developer',
              responsibility: 'Intelitec Solutions',
              time: 'December 2011 - March 2013',
              description:
                'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
            },
            {
              title: 'Junior Web Designer',
              responsibility: 'Shout! Media Productions',
              time: 'July 2010 - December 2011',
              description:
                'Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.',
            },
            {
              title: 'Web Design Intern',
              responsibility: 'Shout! Media Productions',
              time: 'September 2008 - June 2010',
              description:
                'Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
            },
          ],
        },
        {
          id: 'edu',
          title: 'education',
          isActive: false,
          expList: [],
        },
        {
          id: 'skill',
          title: 'skills',
          isActive: false,
          href: 'skills',
          skills: {
            langAndToolList: [
              {
                title: 'Swift',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M938.154667 697.514667c2.389333-4.778667 2.389333-9.557333 4.778666-14.336 57.429333-224.938667-78.976-488.106667-313.472-626.901334 102.912 138.794667 143.573333 303.872 107.690667 452.224-2.389333 11.946667-7.168 26.325333-11.946667 38.272a220.714667 220.714667 0 0 1-19.2-11.946666S473.941333 391.253333 225.152 140.032c-7.210667-7.168 133.973333 200.96 291.882667 366.08-74.154667-43.093333-284.714667-193.792-416.341334-315.861333 14.378667 26.325333 35.925333 52.650667 57.429334 78.976 110.08 141.184 253.653333 313.429333 425.941333 445.013333-122.026667 74.24-291.925333 78.976-464.213333 0-43.093333-19.114667-78.933333-43.050667-119.637334-71.765333 71.765333 112.469333 184.234667 215.381333 318.250667 270.378666 160.298667 69.418667 322.986667 64.64 440.234667 0h2.432c4.778667-2.389333 9.557333-4.778667 14.336-9.557333 57.429333-28.714667 169.898667-59.818667 232.106666 59.818667 16.725333 33.493333 47.829333-122.026667-69.376-265.6z',
                  },
                ],
              },
              {
                title: 'ObjC',
              },
              {
                title: 'Dart',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M175.130029 175.2273S390.704216 67.5042 498.469979 13.578657a131.358188 131.358188 0 0 1 63.183331-13.438724c32.679562 2.005143 71.545203 33.61814 71.545203 33.61814L1023.902729 424.504952v417.624326h-181.870722V1024H417.624326l-383.963524-383.963523C12.926772 618.70517 0 588.628027 0 559.190824c0-13.609374 7.67927-34.898018 13.481386-47.142189l161.648643-336.821335z m28.967915 28.967915v502.864228c0.085325 23.165799 0.895915 43.686516 21.245982 64.335221L435.32931 981.337386h364.040083v-181.870722L204.097944 204.195215z m514.297808-28.925252c-38.35369-38.225702-77.176668-75.939452-116.895561-112.757288-12.884109-11.390918-24.189702-19.966103-45.648997-19.710128-15.785167 0.597277-37.116474 8.31921-37.116474 8.31921L270.523634 175.2273l447.872118 0.042663z',
                  },
                ],
              },
              {
                title: 'HTML5',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M55.113885 0l79.875195 918.564743 373.815912 105.435257L879.425897 918.564743 968.886115 0H55.113885z m731.656786 303.525741H352.24961l12.780031 118.215289h415.351014l-31.950078 345.060842-230.040561 63.900156L288.349454 768.399376l-19.170047-178.920437H384.199688l9.585023 89.460219 130.99532 35.145085 124.605304-35.145085 15.975039-146.970359-399.375975-3.195008-31.950078-335.475819H799.550702c0 1.597504-12.780031 110.227769-12.780031 110.227769z',
                  },
                ],
              },
              {
                title: 'Vue',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M777.8 128.6H624l-112 177.2-96-177.2H64L512 896 960 128.6h-182.2z m-602.4 64h107.6L512 589 740.8 192.6h107.6L512 769 175.4 192.6z',
                  },
                ],
              },
              {
                title: 'Sass',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M484.64 160.448c-45.248-2.4-96.096 4.544-145.824 21.792-79.04 27.424-164.544 70.56-226.016 126.752-73.024 66.88-84.736 125.12-79.936 149.44 17.088 86.4 138.88 142.72 187.648 184.384-2.4 1.28-4.64 2.432-6.752 3.616-24.448 11.872-115.168 58.528-138.4 108.704-26.24 56.896 4.352 97.6 24.448 103.168 62.72 17.024 124.736-12.704 159.2-62.976 34.496-50.304 30.336-115.968 14.4-145.92-0.128-0.416-0.448-0.704-0.608-1.152 6.304-3.68 12.736-7.36 19.2-11.072 12.448-7.2 24.608-13.76 35.264-19.52-6.016 15.872-10.368 34.976-12.64 62.528-2.688 32.256 10.944 73.984 28.64 90.432 7.808 7.2 17.216 7.36 23.04 7.36 20.704 0 30.016-16.704 40.32-36.672 12.736-24.352 24-52.64 24-52.64s-14.08 76.512 24.512 76.512c14.08 0 28.16-17.728 34.496-26.816v0.128s0.224-0.576 0.992-1.76c1.504-2.208 2.24-3.488 2.24-3.488V732.8c5.696-9.536 18.208-31.36 36.96-67.424 24.288-46.624 47.488-104.864 47.488-104.864 2.24 12.8 5.344 25.408 9.312 37.792 4.192 13.92 13.088 29.184 20.128 44-5.696 7.616-9.184 12-9.184 12 0 0.128 0.096 0.256 0.192 0.32-4.512 5.856-9.632 12.16-14.88 18.304-19.2 22.304-42.016 47.872-44.992 55.2-3.616 8.64-2.72 15.04 4.16 20.064 5.12 3.808 14.176 4.384 23.584 3.68a106.592 106.592 0 0 0 35.232-7.936c10.784-3.776 20.992-8.96 30.272-15.488 18.752-13.504 30.176-32.896 29.12-58.4-0.64-14.08-5.312-28.16-11.008-41.376 1.664-2.336 3.52-4.8 5.12-7.296 29.696-42.368 52.64-88.864 52.64-88.864 2.24 12.8 5.344 25.408 9.28 37.792 3.648 11.872 10.688 24.928 17.152 37.696-27.872 22.144-45.184 47.808-51.2 64.672-11.104 31.232-2.336 45.28 14.016 48.512 7.36 1.472 17.824-1.856 25.6-5.056 11.616-3.776 22.496-9.28 32.384-16.32 18.752-13.504 36.928-32.384 35.712-58.048-0.448-11.584-3.712-23.2-8.064-34.336 23.552-9.664 54.08-14.944 93.12-10.56 83.52 9.536 99.872 60.576 96.736 81.824-3.136 21.28-20.704 33.152-26.56 36.672-5.856 3.52-7.616 4.864-7.168 7.52 0.736 3.808 3.392 3.648 8.352 2.752 6.912-1.184 43.776-17.28 45.44-56.768 2.4-49.824-46.56-104.64-133.376-104.224h-0.128c-30.112 0-59.84 6.752-86.88 19.808-8.864-17.44-18.016-32.704-19.488-44.16-1.792-13.312-3.712-21.216-1.6-37.024 2.08-15.84 11.52-38.304 11.36-39.936-0.16-1.6-2.112-9.664-21.44-9.824-19.328-0.16-36.032 3.648-37.952 8.64-3.424 9.088-6.08 18.432-7.936 27.968-3.456 17.152-38.688 78.496-58.624 110.464-6.592-12.48-12.128-23.456-13.312-32.256-1.792-13.344-3.776-21.248-1.696-37.056 2.112-15.84 11.616-38.304 11.456-39.936-0.16-1.6-2.112-9.664-21.44-9.824-19.328-0.16-36.064 3.648-38.016 8.64-1.92 4.96-4.064 16.672-7.936 27.968-3.904 11.296-50.816 113.408-63.104 139.936-6.304 13.504-11.744 24.384-15.648 31.68-0.608 1.216-1.024 1.92-1.28 2.528 0.416-0.736 0.736-1.472 0.736-1.184-3.296 6.304-5.248 9.792-5.248 9.792v0.128c-2.56 4.704-5.44 9.024-6.752 9.024-0.896 0-2.88-12.352 0.448-29.216 7.04-35.488 23.68-90.624 23.552-92.544-0.16-1.024 3.072-10.56-11.008-15.68-13.664-4.832-18.56 3.232-19.744 3.232-1.216 0-2.112 2.944-2.112 2.944s15.072-62.176-29.12-62.176c-27.648 0-66.048 29.6-84.896 56.416-11.84 6.304-37.504 19.968-64.512 34.496l-30.976 16.704c-0.736-0.736-1.376-1.472-2.144-2.208-53.696-56-152.8-95.616-148.608-170.88 1.504-27.392 11.296-99.36 190.624-186.784 147.008-71.552 264.512-51.936 284.736-8.256 29.12 62.336-62.848 178.368-215.488 195.072-58.176 6.304-84.992-18.272-92.64-26.496-7.936-8.64-9.184-9.12-12.16-7.52-4.992 2.624-1.824 10.272 0 14.816 4.48 11.584 24.544 29.728 56.48 40 28.064 8.96 92.48 16.48 175.008-14.72 92.672-34.944 163.456-129.792 142.304-211.168-13.44-51.68-73.248-81.632-148.608-85.6z m-49.216 392.8c2.368 0.16 4.096 1.056 5.088 2.688 5.248 8.672-18.24 72.512-24.256 86.88-9.6 23.04-29.888 81.728-42.208 78.624-10.496-2.624-16.96-47.36-2.112-91.392 7.488-22.144 23.392-48.512 32.864-58.784 11.36-12.448 23.616-18.56 30.624-18.016z m311.68 72.384c1.792 5.12 2.72 10.496 2.848 15.872-0.16 33.024-24.32 45.312-38.816 50.432-3.008-2.048-2.624-8.96 7.424-30.4 3.904-8.32 12.96-22.4 28.576-35.904zM243.36 662.016c12.448 44.576 0.448 83.872-28.64 114.88-27.584 29.44-66.304 40.608-82.944 31.232-17.856-10.144-10.784-53.568 23.264-84.992 20.704-19.072 47.424-36.672 65.12-47.52 4.064-2.336 9.856-5.856 17.056-10.112a18.432 18.432 0 0 1 1.824-0.992c1.344-0.864 2.816-1.6 4.32-2.496z m376.864 5.12c0 0.736 0.192 1.504 0.192 2.368-0.192 26.24-26.048 43.968-37.76 51.008h0.128v0.064c-4.064 2.048-7.84 3.328-9.6 2.304-1.376-0.736 1.664-3.52 1.664-3.52s20.832-21.888 29.056-31.872c4.8-5.856 10.336-12.736 16.32-20.352z',
                  },
                ],
              },
              {
                title: 'Xcode',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M853.333333 204.8c17.066667-8.533333 25.6-17.066667 38.4-17.066667 21.333333 0 34.133333 12.8 38.4 21.333334 8.533333 12.8 38.4 21.333333 51.2 21.333333 8.533333 0 21.333333-29.866667 29.866667-55.466667s8.533333-55.466667 4.266667-59.733333c-4.266667-4.266667-38.4-12.8-46.933334-12.8-4.266667 4.266667-12.8 8.533333-29.866666 8.533333s-34.133333-12.8-46.933334-25.6c-21.333333-21.333333-46.933333-29.866667-72.533333-38.4-25.6-8.533333-55.466667-8.533333-81.066667-8.533333-38.4-4.266667-81.066667-4.266667-119.466666 8.533333-17.066667 4.266667-29.866667 8.533333-46.933334 17.066667-4.266667 4.266667-17.066667 8.533333-21.333333 8.533333-4.266667 4.266667-4.266667 8.533333 0 8.533334s21.333333-4.266667 21.333333-4.266667-21.333333 8.533333-21.333333 17.066667c0 4.266667 4.266667 4.266667 4.266667 4.266666s12.8-4.266667 21.333333-4.266666c17.066667 0 42.666667-8.533333 64-8.533334 25.6 0 51.2 8.533333 76.8 34.133334 38.4 46.933333 34.133333 106.666667 34.133333 119.466666-8.533333 89.6-209.066667 635.733333-217.6 674.133334-8.533333 38.4-8.533333 59.733333 38.4 72.533333s64 0 72.533334-17.066667c4.266667-29.866667 132.266667-704 209.066666-763.733333z',
                  },
                  {
                    path:
                      'M686.933333 162.133333L0 268.8 110.933333 981.333333l366.933334-59.733333c-4.266667-29.866667 93.866667-285.866667 110.933333-332.8l-187.733333 29.866667 25.6-76.8 132.266666-21.333334 34.133334 42.666667s8.533333-21.333333 8.533333-29.866667L418.133333 307.2c-8.533333-12.8-8.533333-29.866667 4.266667-38.4l8.533333-8.533333c12.8-8.533333 29.866667-8.533333 38.4 4.266666l162.133334 187.733334c34.133333-102.4 64-192 64-221.866667 4.266667-8.533333 4.266667-38.4-8.533334-68.266667z m-512 422.4l115.2-21.333333-29.866666 76.8-76.8 12.8-8.533334-68.266667z m247.466667-217.6l12.8 4.266667c17.066667 4.266667 21.333333 21.333333 17.066667 38.4l-128 341.333333L247.466667 853.333333l8.533333-128 128-341.333333c4.266667-17.066667 21.333333-21.333333 38.4-17.066667z m460.8-119.466666c-17.066667 17.066667-38.4 72.533333-81.066667 234.666666h4.266667l12.8 68.266667-34.133333 4.266667c-4.266667 21.333333-8.533333 42.666667-17.066667 68.266666 72.533333 38.4 34.133333 132.266667 29.866667 132.266667-4.266667 0-4.266667 0-4.266667-4.266667s4.266667-17.066667-8.533333-21.333333c-8.533333-4.266667-25.6-8.533333-38.4-17.066667-12.8 51.2-25.6 110.933333-38.4 174.933334l268.8-42.666667-89.6-601.6-4.266667 4.266667z',
                  },
                ],
              },
              {
                title: 'VSCode',
                svg: [
                  {
                    fill: '#000000',
                    path:
                      'M746.222933 102.239573l-359.799466 330.820267L185.347413 281.4976 102.2464 329.864533l198.20544 182.132054-198.20544 182.132053 83.101013 48.510293 201.076054-151.558826 359.799466 330.676906 175.527254-85.251413V187.4944z m0 217.57952v384.341334l-255.040853-192.177494z',
                  },
                ],
              },
            ],
            workflowList: [
              'Mobile-First, Responsive Design',
              'Cross Browser Testing & Debugging',
              'Cross Functional Teams',
              'Agile Development & Scrum',
            ],
          },
        },
        {
          id: 'int',
          title: 'interests',
          isActive: false,
          iList: [
            'Apart from being a web developer, I enjoy most of my time being outdoors. In the winter, I am an avid skier and novice ice climber. During the warmer months here in Colorado, I enjoy mountain biking, free climbing, and kayaking.',
            'When forced indoors, I follow a number of sci-fi and fantasy genre movies and television shows, I am an aspiring chef, and I spend a large amount of my free time exploring the latest technology advancements in the front-end web development world.',
          ],
        },
      ],
    };
  },
  methods: {

  },
  mounted() {

  },
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";

$navbar-max-width: 17rem;

.resume-navbar__link {
  display: block;
  padding: $nav-link-padding-y $nav-link-padding-x;
  text-decoration: if($link-decoration == none, null, none);

  @include hover-focus() {
    text-decoration: none;
  }

  // Disabled state lightens text
  &.disabled {
    color: $nav-link-disabled-color;
    pointer-events: none;
    cursor: default;
  }
}

// Contents
//
// Navbar
// Navbar brand
// Navbar nav
// Navbar text
// Navbar divider
// Responsive navbar
// Navbar position
// Navbar themes

// Navbar
//
// Provide a static navbar from which we expand to create full-width, fixed, and
// other navbar variations.

.resume-navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap; // allow us to do the line break for collapsing content
  align-items: center;
  justify-content: space-between; // space out brand from logo
  padding: $navbar-padding-y $navbar-padding-x;

  // Because flex properties aren't inherited, we need to redeclare these first
  // few properties so that content nested within behave properly.
  %container-flex-properties {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .container,
  .container-fluid {
    @extend %container-flex-properties;
  }

  @each $breakpoint, $container-max-width in $container-max-widths {
    > .container#{breakpoint-infix($breakpoint, $container-max-widths)} {
      @extend %container-flex-properties;
    }
  }
}

// Navbar brand
//
// Used for brand, project, or site names.

.resume-navbar__brand {
  display: inline-block;
  padding-top: $navbar-brand-padding-y;
  padding-bottom: $navbar-brand-padding-y;
  margin-right: $navbar-padding-x;
  @include font-size($navbar-brand-font-size);
  line-height: inherit;
  white-space: nowrap;

  @include hover-focus() {
    text-decoration: none;
  }
}

// Navbar nav
//
// Custom navbar navigation (doesn't require `.nav`, but does make use of `.resume-navbar__link`).

.resume-navbar__list {
  display: flex;
  flex-direction: column; // cannot use `inherit` to get the `.navbar`s value
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;

  .resume-navbar__link {
    padding-right: 0;
    padding-left: 0;
  }

  .dropdown-menu {
    position: static;
    float: none;
  }
}

// Navbar text
//
//

.resume-navbar__text {
  display: inline-block;
  padding-top: $nav-link-padding-y;
  padding-bottom: $nav-link-padding-y;
}

// Responsive navbar
//
// Custom styles for responsive collapsing and toggling of navbar contents.
// Powered by the collapse Bootstrap JavaScript plugin.

// When collapsed, prevent the toggleable navbar contents from appearing in
// the default flexbox row orientation. Requires the use of `flex-wrap: wrap`
// on the `.navbar` parent.
.resume-navbar__collapse {
  flex-basis: 100%;
  flex-grow: 1;
  // For always expanded or extra full navbars, ensure content aligns itself
  // properly vertically. Can be easily overridden with flex utilities.
  align-items: center;
}

// Button for toggling the navbar when in its collapsed state
.resume-navbar__toggler {
  padding: $navbar-toggler-padding-y $navbar-toggler-padding-x;
  @include font-size($navbar-toggler-font-size);
  line-height: 1;
  background-color: transparent; // remove default button style
  border: $border-width solid transparent; // remove default button style
  @include border-radius($navbar-toggler-border-radius);

  @include hover-focus() {
    text-decoration: none;
  }
}

// Keep as a separate element so folks can easily override it with another icon
// or image file as needed.
.resume-navbar__toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat center center;
  background-size: 100% 100%;
}

// Generate series of `.resume-navbar__expand-*` responsive classes for configuring
// where your navbar collapses.
.resume-navbar__expand {
  @each $breakpoint in map-keys($grid-breakpoints) {
    $next: breakpoint-next($breakpoint, $grid-breakpoints);
    $infix: breakpoint-infix($next, $grid-breakpoints);

    &#{$infix} {
      @include media-breakpoint-down($breakpoint) {
        %container-navbar-expand-#{$breakpoint} {
          padding-right: 0;
          padding-left: 0;
        }

        > .container,
        > .container-fluid {
          @extend %container-navbar-expand-#{$breakpoint};
        }

        @each $size, $container-max-width in $container-max-widths {
          > .container#{breakpoint-infix($size, $container-max-widths)} {
            @extend %container-navbar-expand-#{$breakpoint};
          }
        }
      }

      @include media-breakpoint-up($next) {
        flex-flow: row nowrap;
        justify-content: flex-start;

        .resume-navbar__list {
          flex-direction: row;

          .dropdown-menu {
            position: absolute;
          }

          .resume-navbar__link {
            padding-right: $navbar-nav-link-padding-x;
            padding-left: $navbar-nav-link-padding-x;
          }
        }

        // For nesting containers, have to redeclare for alignment purposes
        %container-nesting-#{$breakpoint} {
          flex-wrap: nowrap;
        }

        > .container,
        > .container-fluid {
          @extend %container-nesting-#{$breakpoint};
        }

        @each $size, $container-max-width in $container-max-widths {
          > .container#{breakpoint-infix($size, $container-max-widths)} {
            @extend %container-nesting-#{$breakpoint};
          }
        }

        .resume-navbar__collapse {
          display: flex !important; // stylelint-disable-line declaration-no-important

          // Changes flex-bases to auto because of an IE10 bug
          flex-basis: auto;
        }

        .resume-navbar__toggler {
          display: none;
        }
      }
    }
  }
}

// Navbar themes
//
// Styles for switching between navbars with light or dark background.

// Dark links against a light background
.resume-navbar__light {
  .resume-navbar__brand {
    color: $navbar-light-brand-color;

    @include hover-focus() {
      color: $navbar-light-brand-hover-color;
    }
  }

  .resume-navbar__list {
    .resume-navbar__link {
      color: $navbar-light-color;

      @include hover-focus() {
        color: $navbar-light-hover-color;
      }

      &.disabled {
        color: $navbar-light-disabled-color;
      }
    }

    .show > .resume-navbar__link,
    .active > .resume-navbar__link,
    .resume-navbar__link.show,
    .resume-navbar__link.active {
      color: $navbar-light-active-color;
    }
  }

  .resume-navbar__toggler {
    color: $navbar-light-color;
    border-color: $navbar-light-toggler-border-color;
  }

  .resume-navbar__toggler-icon {
    background-image: escape-svg($navbar-light-toggler-icon-bg);
  }

  .resume-navbar__text {
    color: $navbar-light-color;
    a {
      color: $navbar-light-active-color;

      @include hover-focus() {
        color: $navbar-light-active-color;
      }
    }
  }
}

// White links against a dark background
.resume-navbar__dark {
  .resume-navbar__brand {
    color: $navbar-dark-brand-color;

    @include hover-focus() {
      color: $navbar-dark-brand-hover-color;
    }
  }

  .resume-navbar__list {
    .resume-navbar__link {
      color: $navbar-dark-color;

      @include hover-focus() {
        color: $navbar-dark-hover-color;
      }

      &.disabled {
        color: $navbar-dark-disabled-color;
      }
    }

    .show > .resume-navbar__link,
    .active > .resume-navbar__link,
    .resume-navbar__link.show,
    .resume-navbar__link.active {
      color: $navbar-dark-active-color;
    }
  }

  .resume-navbar__toggler {
    color: $navbar-dark-color;
    border-color: $navbar-dark-toggler-border-color;
  }

  .resume-navbar__toggler-icon {
    background-image: escape-svg($navbar-dark-toggler-icon-bg);
  }

  .resume-navbar__text {
    color: $navbar-dark-color;
    a {
      color: $navbar-dark-active-color;

      @include hover-focus() {
        color: $navbar-dark-active-color;
      }
    }
  }
}

#nav {
  @include media-breakpoint-up(lg) {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    width: $navbar-max-width;
    height: 100vh;
    .resume-navbar__brand {
      display: flex;

      margin: auto auto 0;
      padding: 0.5rem;
      .img-profile {
        max-width: 10rem;
        max-height: 10rem;
        border: 0.5rem solid fade-out($white, 0.8);
      }
    }
    .resume-navbar__collapse {
      display: flex;
      align-items: flex-start;
      flex-grow: 0;

      width: 100%;
      margin-bottom: auto;
      .resume-navbar__list {
        flex-direction: column;

        width: 100%;
        .resume-navbar__list-item {
          display: block;
          .resume-navbar__link {
            display: block;
          }
        }
      }
    }
  }

  .resume-navbar__list .resume-navbar__list-item .resume-navbar__link {
    font-weight: 800;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
  }

  .resume-navbar__toggler {
    &:focus {
      outline-color: lighten($primary, 15%);
    }
  }
}

.resume-wrap {
  padding: 0 1rem;

  @include media-breakpoint-up(lg) {
    padding-left: $navbar-max-width + 3rem !important;
    padding-right: 3rem;
  }

  section {
    display: flex;
    align-items: center;
    padding: 5rem 0;
    max-width: 75rem;

    border-bottom: 1px solid $border-color;
    &:last-child {
      border-bottom: none;
    }

    @include media-breakpoint-up(md) {
      min-height: 100vh;
    }

    .resume-section__wrap {
      width: 100%;
    }
  }
}

.resume-social__list {
  .resume-social__list-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    width: 3.5rem;
    background-color: $gray-700;
    color: $white;
    border-radius: 100%;
    font-size: 1.5rem;
    margin-right: 1.5rem;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background-color: $primary;
    }
  }
}

.xxLang-list {
  margin: 2rem 0;

  .list-inline-item:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.icon {
  width: 2rem;
  height: 2rem;
}
</style>
