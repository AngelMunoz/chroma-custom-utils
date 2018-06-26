import { should } from "fuse-test-runner";
import { ChromaSdk } from "../lib/chroma-sdk";

export class ChromaSdkTest {
  chromaInstance: ChromaSdk = null;
  beforeEach() {
    /**
     * Typescript complains about this, but the test runner 
     * will actually create an instance (there are no abstract classes
     * in javascript runtime) so you can ignore the compiler here
     */
    this.chromaInstance = new ChromaSdk(true, {
      author: {
        name: "Chroma Tester",
        contact: "Tester"
      },
      title: "Chroma SDK Test Runner",
      device_supported: ["keyboard"],
      category: "application",
      description: "Test App"
    });
    // it's important to return for the test runner to wait for resolution
    return this.chromaInstance.init();
  }

  async "Should init Instance"() {
    await this.chromaInstance.init()
    should(this.chromaInstance.ready)
      .beTrue();
    return
  }
  async "Should unload instance"() {
    this.chromaInstance.init()
    should(this.chromaInstance.ready)
      .beTrue();
      
    this.chromaInstance.unload();
    should(this.chromaInstance.ready)
      .beFalse();
    return
  }

  afterEach() {
    this.chromaInstance.unload();
  }

}
