import http from "k6/http";

export let options = {
  vus: 150,
  duration: "1m"
};

export default function() {
  http.get("http://localhost:8081/product/348031");
};