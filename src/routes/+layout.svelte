<script lang="ts">
  import '../app.css';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { navigating } from '$app/stores';
  
  // Initialize theme
  onMount(() => {
    theme.init();
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    }
  });
  
  // Add page transition class when navigating
  $: isNavigating = $navigating !== null;
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <meta name="theme-color" content="#0ea5e9" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" type="image/png" href="/icons/icon-192.png" />
  <link rel="apple-touch-icon" href="/icons/icon-192.png" />
</svelte:head>

<div id="app" class="flex flex-col h-full bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
  <main class="flex-1 overflow-hidden pb-28 relative w-full max-w-md mx-auto md:max-w-full">
    <div 
      class="h-full transition-smooth"
      class:opacity-50={isNavigating}
    >
      <slot />
    </div>
  </main>
  
  <div class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-md mx-auto md:max-w-full">
    <BottomNav />
  </div>
</div>

<style>
  :global(html) {
    touch-action: pan-y;
  }
</style>
