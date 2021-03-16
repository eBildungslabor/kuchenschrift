var app = new Vue({
  el: "#app",
  data: {
    readOnly: false,
    copied: false,
    from: "Me",
    message: "Gib hier deine Nachricht ein",
    cake: 1,
    font: 1,
    fonts: [
      { id: 1, name: "Neat" },
      { id: 2, name: "Piped" },
      { id: 3, name: "Curly" },
    ],
    icingColour: "#222222",
    icingColours: [
      { id: "#222222", name: "braun" },
      { id: "#eadbd8", name: "weiß" },
      { id: "#fdeded", name: "pink" },
      { id: "#f7a252", name: "orange" },
      { id: "#466c8d", name: "blau" },
    ],
    cakes: [
      { id: 1, bgColour: "#d8c7cf" },
      { id: 2, bgColour: "#d8c7cf" },
      { id: 3, bgColour: "#d8c7cf" },
      { id: 4, bgColour: "#d8c7cf" },
    ],
  },
  mounted() {
    console.log("Mounted!!");
    const params = new URLSearchParams(location.search);
    this.readOnly = params.get("r") == "1";
    this.from = params.get("from") || "";
    this.cake = +params.get("cake") || 1;
    this.font = +params.get("font") || 1;
    this.icingColour = params.get("col") || "#222222";
    const msg = params.get("message");
    if (msg) {
      this.message = atob(msg);
    }
  },
  watch: {
    message: function () {
      this.setUrl();
    },
    from: function () {
      this.setUrl();
    },
    cake: function () {
      this.setUrl();
    },
    font: function () {
      this.setUrl();
    },
    icingColour: function () {
      this.setUrl();
    },
  },
  computed: {
    bodyStyle() {
      return {
        background: this.bgColour,
      };
    },
    imgStyle() {
      return {
        background:
          "url(" + this.cakeUrl + ") no-repeat scroll top center / contain",
      };
    },
    cakeUrl() {
      return "img/cake" + this.cake + ".png";
    },
    bgColour() {
      return this.cakes.find((c) => c.id === this.cake).bgColour;
    },
  },
  methods: {
    startEditing() {
      console.log("startEditing");
      this.readOnly = false;
      this.cake = 1;
      this.font = 1;
      this.icingColour = this.icingColours[0].id;
      this.from = "Absendername";
      this.message = "Gib hier Deine Nachricht ein";
      this.setUrl();
    },
    setUrl() {
      const params = new URLSearchParams(location.search);
      params.set("message", btoa(this.message));
      params.set("from", this.from);
      params.set("cake", this.cake);
      params.set("font", this.font);
      params.set("col", this.icingColour);
      params.set("r", "1");
      params.toString();
      window.history.replaceState(
        {},
        "",
        `${location.pathname}?${params.toString()}`
      );
    },
    copy() {
      try {
        this.copied = true;
        window.setTimeout(() => this.copied = false, 1000);
        navigator.clipboard.writeText(window.location.href);
      } catch (e) {}
    },
  },
});
