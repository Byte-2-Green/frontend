<script>
    import Header from '../components/Header.svelte';
    import StatsPanel from '../components/StatsPanel.svelte';
    import Gallery from '../components/Gallery.svelte';
    import Footer from '../components/Footer.svelte';
  
    let unlockedFrames = 4;
    let savedCO2 = 0.5; // kg
  </script>
  
  <div class="flex flex-col h-screen bg-background-light">
    <Header />
    <main class="flex-1 overflow-y-auto">
      <StatsPanel {unlockedFrames} {savedCO2} />
      <Gallery />
    </main>
    <Footer />
  </div>
  