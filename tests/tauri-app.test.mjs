/**
 * Installs Yaak (an open-source Tauri API client) on Linux, sends an HTTP request
 * from its UI, and checks the response it renders.
 */
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const YAAK_DEB =
  "https://github.com/mountain-loop/yaak/releases/download/v2026.9.0/yaak_2026.9.0_amd64.deb";

describe("Yaak (Tauri)", () => {
  it("sends a GET request and shows the JSON response", async (context) => {
    const testdriver = TestDriver(context);

    // Download and install the .deb. We start the app ourselves below.
    await testdriver.provision.installer({ url: YAAK_DEB, launch: false });

    // Pull in Tauri's Linux runtime dependencies (WebKitGTK, libsoup) and start Yaak.
    await testdriver.exec(
      "sh",
      "sudo apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -f -y -qq",
      240000,
    );
    await testdriver.exec("sh", "nohup yaak-app-client >/tmp/yaak.log 2>&1 &", 10000);

    // Start with an empty workspace. The first find waits for the window to appear.
    await testdriver.find('"Start fresh" card on the Yaak welcome screen', { timeout: 60000 }).click();

    // Create a new HTTP request.
    await testdriver.find('"New Request" button in the middle of the empty workspace').click();
    await testdriver.find('"HTTP" option in the New Request dropdown menu').click();

    // Enter a URL and send it.
    await testdriver.find('URL input with the placeholder "https://example.com" next to the GET method selector').click();
    await testdriver.type("https://httpbin.org/json");
    await testdriver.find("Send button (paper airplane icon) at the right end of the URL bar").click();

    // Wait for the response to arrive, then check what the app rendered.
    await testdriver.find("green 200 OK status label at the top of the response panel", { timeout: 30000 });
    const responseShown = await testdriver.assert(
      'the response panel shows a green 200 OK status and a JSON body containing "Sample Slide Show"',
    );
    expect(responseShown).toBeTruthy();

    const savedInSidebar = await testdriver.assert(
      'the sidebar lists the request as "httpbin.org/json" with a 200 status badge',
    );
    expect(savedInSidebar).toBeTruthy();
  });
});
