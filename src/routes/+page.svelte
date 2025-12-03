<script lang="ts">
  import { onMount } from 'svelte';
  import { animations } from '$lib/utils/animations';
  
  let listItems: HTMLElement[] = [];
  let container: HTMLElement;
  
  const items = [
    { id: 1, title: 'Welcome to PWA', description: 'A smooth, native-like mobile experience', emoji: '🚀' },
    { id: 2, title: 'Offline Support', description: 'Works even without internet connection', emoji: '📱' },
    { id: 3, title: 'Fast Performance', description: 'GPU-accelerated animations', emoji: '⚡' },
    { id: 4, title: 'Responsive Design', description: 'Optimized for all screen sizes', emoji: '📐' },
    { id: 5, title: 'Modern UI', description: 'Clean and intuitive interface', emoji: '🎨' },
    { id: 6, title: 'Dark Mode', description: 'Easy on the eyes at night', emoji: '🌙' },
    { id: 7, title: 'Touch Optimized', description: 'Smooth gestures and interactions', emoji: '👆' },
    { id: 8, title: 'Lazy Loading', description: 'Efficient resource management', emoji: '⏱️' },
    { id: 9, title: 'Code Splitting', description: 'Load only what you need', emoji: '📦' },
    { id: 10, title: 'PWA Ready', description: 'Install on your home screen', emoji: '✨' },
  ];
  
  onMount(() => {
    // Animate list items on mount
    if (listItems.length > 0) {
      animations.staggerList(listItems);
    }
  });
</script>

<svelte:head>
  <title>Home - Mobile PWA</title>
</svelte:head>

<div bind:this={container} class="h-full smooth-scroll bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
  <div class="safe-top px-4 py-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2 gpu-accelerated">
        Mobile PWA
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Smooth, fast, and native-like
      </p>
    </div>
    
    <div class="space-y-3 pb-8">
      {#each items as item, i}
        <div
          bind:this={listItems[i]}
          class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 gpu-accelerated will-animate opacity-0"
        >
          <div class="flex items-start gap-4">
            <div class="text-4xl flex-shrink-0">
              {item.emoji}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .smooth-scroll {
    scroll-behavior: smooth;
  }
</style>
