<template>
  <div>
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>

    <div class="landing top-sec">
      <!--PLAN AHEAD-->
      <div class="container p-0 m-0">
        <div class="row top-bar phonepad no-gutters">
          <div class="col">
            <div class="row no-gutters top-section">
              <h1 class="plan-head mt-5">
                <div>Schedule Smarter</div>
                <div>Plan Ahead</div>
              </h1>
            </div>
            <div class="row no-gutters top-section">
              <div class="plan-subhead">
                <div>Introducing the newest and easiest</div>
                <div>way to plan courses at Cornell</div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col top-section">
                <button
                  @click="socialLogin"
                  class="email-button email-button--top"
                  variant="primary"
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 top-section image-wrapper image-wrapper--laptop">
            <img
              style="position: relative"
              class="laptop"
              aria-label="laptop"
              src="@/assets/images/landing_new/laptop.svg"
              alt="laptop preview"
            />
          </div>
        </div>
      </div>

      <!--NEW WAY-->
      <div class="new container p-0 new-way">
        <div class="row new no-gutters">
          <div class="col tasks">
            <figure class="figure">
              <img
                src="@/assets/images/landing_new/icon1.svg"
                class="sub--task"
                alt="checklist"
                aria-label="checklist"
              />
              <figcaption class="sub">Fully personalized to track your requirements</figcaption>
            </figure>
          </div>
          <div class="col tasks">
            <figure class="figure">
              <img
                src="@/assets/images/landing_new/icon2.svg"
                class="sub--task"
                alt="browser"
                aria-label="browser"
              />
              <figcaption class="sub">Customizable interface to view your courses</figcaption>
            </figure>
          </div>
          <div class="col tasks">
            <figure class="figure">
              <img
                src="@/assets/images/landing_new/icon3.svg"
                class="sub--task"
                alt="Network"
                aria-label="network"
              />
              <figcaption class="sub">Built-in system to check your progress</figcaption>
            </figure>
          </div>
          <div class="col tasks">
            <figure class="figure">
              <img
                src="@/assets/images/landing_new/icon4.svg"
                class="sub--task"
                alt="Starred comment"
                aria-label="starred comment"
              />
              <figcaption class="sub">View course information all in one place</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <!-- DRAG -->
      <div class="container-fluid plan p-0 center">
        <div class="drag phonepad row no-gutters">
          <img
            class="hide preview"
            src="@/assets/images/landing_new/img1.svg"
            alt="Dragging preview"
            aria-label="dragging preview"
            style="position: absolute"
          />
          <div class="comment comment-drag">
            <h1 class="head">Drag and Drop Courses</h1>
            <p class="sub-text">
              CoursePlan’s intuitive interface recommends courses based on unfulfilled requirements
              and allows you to easily drag and drop them into your planner
            </p>
          </div>
        </div>
      </div>

      <!-- SEMESTERS -->
      <div class="container-fluid p-0 center">
        <div class="semester phonepad row no-gutters">
          <div class="comment comment-sem">
            <h1 class="head">Plan Your Semesters</h1>
            <p class="sub-text">
              Use CoursePlan’s semesterly planner to choose courses well in advance and ensure that
              you never miss a requirement
            </p>
          </div>
          <img
            class="hide schedule"
            src="@/assets/images/landing_new/img2.svg"
            alt="Plan preview"
            aria-label="plan preview"
          />
        </div>
      </div>
      <br style="clear: both" />

      <!--FOOTER-->
      <custom-footer />
    </div>
  </div>
</template>