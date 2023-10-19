async function fetchFeatureFlags() {
    try {
        const response = await fetch('/fflags');
        const fflags = await response.json();
        return fflags;
    } catch (error) {
        console.error('Error fetching feature flags:', error);
        return null;
    }
}

async function update() {
    const fflags = await fetchFeatureFlags();
    if (fflags) {
        const f1_enabled = fflags.feature1.enabled
        document.getElementById('feature1').style.visibility = f1_enabled ? 'visible' : 'hidden';
        if(f1_enabled)
            document.getElementById('feature1').style.backgroundColor = fflags.feature1.color;

        const f2_enabled = fflags.feature2.enabled
        document.getElementById('feature2').style.visibility = fflags.feature2.enabled ? 'visible' : 'hidden';
        if(f2_enabled)
            document.getElementById('feature2').style.backgroundColor = fflags.feature2.color;
    }
}

update();
setInterval(update, 30000); // Adjust as needed
