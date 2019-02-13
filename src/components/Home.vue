<template>
  <div class="home">
    <div class="pill-days" v-if="days">
      <div
        class="pill-day"
        v-for="(day, dayOfYear) in daysReversed"
        v-bind:class="{
          'is-complete': day.pillsTaken == maxPills,
          'is-missing': day.pillsTaken < maxPills
        }"
      >
        <div class="pill-date">
          {{ day.date | formatDate("dddd, DD.MM.YYYY") }}
        </div>
        <div>
          <button
            class="btn-pill"
            v-for="pill in maxPills"
            v-bind:class="{ 'is-active': day.pillsTaken >= pill }"
            v-on:click="pillsClick(day, pill);"
          >
            <span>{{ pill }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
  name: "home",
  data() {
    return {
      maxPills: 6,
      days: {}
    };
  },
  computed: {
    daysReversed: function() {
      return _.orderBy(this.days, "date", "desc");
    }
  },
  beforeMount() {
    if (localStorage.days) {
      this.days = this.$localStorage.get("days");
    }
    let dayOfYear = this.dayOfYear();
    if (this.days == "undefined" || typeof this.days == "undefined")
      this.days = [];
    if (
      this.days[dayOfYear] == "undefined" ||
      typeof this.days[dayOfYear] == "undefined"
    ) {
      this.days[dayOfYear] = {
        date: Date.now(),
        pillsTaken: 0
      };
      this.saveDays();
    }
  },
  methods: {
    pillsClick(day, no) {
      if (no == 1 && day.pillsTaken == 1) no = 0;
      day.pillsTaken = no;
      this.saveDays();
    },
    saveDays() {
      this.$localStorage.set("days", this.days);
    },
    dayOfYear() {
      return moment().format("DDD");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

.pill-day {
  padding: 10px 20px;
  font-size: 18px;
  text-align: left;
  transition: all 250ms ease-in-out;
  background: #fff;
  // box-shadow: 0 0 0 1px red;
}
.pill-day.is-complete {
  background: #cafdd3;
}
.pill-day.is-missing {
  background: #fdcaca;
}
.pill-date {
  color: #000;
  text-transform: capitalize;
  margin-bottom: 4px;
}
.btn-pill {
  font-size: 18px;
  border: none;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-right: 4px;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
  background: rgba(72, 171, 242, 0.2);
  color: rgba(0, 0, 0, 1);
  transition: all 150ms ease-in-out;
}
.btn-pill.is-active {
  background: rgba(72, 171, 242, 1);
  color: rgba(255, 255, 255, 1);
}
.btn-pill:focus {
  outline: none;
}

a {
  color: #35495e;
}
</style>
