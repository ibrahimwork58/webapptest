<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { animate } from 'motion';
  
  let currentTheme: 'light' | 'dark' | 'system' = 'system';
  let canInstall = false;
  let deferredPrompt: any;
  
  onMount(() => {
    // Subscribe to theme store
    const unsubscribe = theme.subscribe((value) => {
      currentTheme = value;
    });
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      canInstall = true;
    });
    
    return unsubscribe;
  });
  
  function handleThemeToggle() {
    theme.toggle();
  }
  
  async function handleInstall() {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      canInstall = false;
    }
    
    deferredPrompt = null;
  }
  
  function getThemeLabel(t: string): string {
    return t === 'system' ? 'System Auto' : t.charAt(0).toUpperCase() + t.slice(1);
  }
  
  function getThemeIcon(t: string): string {
    if (t === 'system') return '🔄';
    if (t === 'light') return '☀️';
    return '🌙';
  }
</script>

<svelte:head>
  <title>Settings - Mobile PWA</title>
</svelte:head>

<div class="h-full smooth-scroll bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
  <div class="safe-top px-4 py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Settings
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Customize your experience
      </p>
    </div>
    
    <div class="space-y-4 pb-8">
      <!-- Theme Setting -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-2xl">
              {getThemeIcon(currentTheme)}
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Theme
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {getThemeLabel(currentTheme)}
              </p>
            </div>
          </div>
          <button
            on:click={handleThemeToggle}
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-smooth gpu-accelerated active:scale-95"
          >
            Toggle
          </button>
        </div>
      </div>
      
      <!-- Install PWA -->
      {#if canInstall}
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 shadow-lg text-white">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold mb-1">
                Install App
              </h3>
              <p class="text-sm text-primary-100 mb-3">
                Add to your home screen for quick access
              </p>
              <button
                on:click={handleInstall}
                class="px-4 py-2 bg-white text-primary-600 rounded-xl font-medium transition-smooth gpu-accelerated active:scale-95"
              >
                Install Now
              </button>
            </div>
            <div class="text-3xl">
              ⬇️
            </div>
          </div>
        </div>
      {:else}
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-start gap-3">
            <div class="text-2xl">
              ✅
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                PWA Installed
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                This app is already installed or running in standalone mode
              </p>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- App Info -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          About
        </h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Version</span>
            <span class="text-gray-900 dark:text-white font-medium">1.0.0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Framework</span>
            <span class="text-gray-900 dark:text-white font-medium">SvelteKit</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Styling</span>
            <span class="text-gray-900 dark:text-white font-medium">Tailwind CSS</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Animations</span>
            <span class="text-gray-900 dark:text-white font-medium">Motion One</span>
          </div>
        </div>
      </div>
      
      <!-- Features -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Features
        </h3>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Offline support with service worker
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            GPU-accelerated animations
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Lazy loading & code splitting
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Mobile-first responsive design
          </li>
          <li class="flex items-center gap-2">
            <span class="text-green-500">✓</span>
            Dark mode support
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
