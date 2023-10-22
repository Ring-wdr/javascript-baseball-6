//@ts-check
import BaseBall from "./Baseball.js";

class App {
  async play() {
    const baseball = new BaseBall();
    await baseball.start();
  }
}

export default App;
