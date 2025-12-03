<script lang="ts">
  import { page } from '$app/stores';
  import { animate } from 'motion';
  
  let activeIndicator: HTMLElement;
  
  $: currentPath = $page.url.pathname;
  
  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/gallery', label: 'Gallery', icon: 'gallery' },
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];
  
  function animateIndicator(node: HTMLElement) {
    if (activeIndicator) {
      animate(activeIndicator, { scale: [1, 1.1, 1] }, { duration: 0.3 });
    }
  }
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50 safe-bottom pointer-events-none">
  <div class="pointer-events-auto backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
    <div class="flex items-center justify-around px-2 py-2">
      {#each navItems as item}
        <a
          href={item.path}
          class="group flex flex-col items-center justify-center w-full max-w-[80px] py-1 px-1 rounded-xl transition-all duration-300 relative"
          class:text-primary-600={currentPath === item.path}
          class:dark:text-primary-400={currentPath === item.path}
          class:text-gray-500={currentPath !== item.path}
          class:dark:text-gray-400={currentPath !== item.path}
        >
          <div class="relative p-1.5 rounded-2xl overflow-hidden transition-all duration-300 group-active:scale-95">
            {#if currentPath === item.path}
              <div
                class="absolute inset-0 bg-primary-100 dark:bg-primary-500/20 opacity-100 transition-opacity duration-300"
                bind:this={activeIndicator}
              ></div>
            {/if}
            
            <div class="relative z-10">
              {#if item.icon === 'home'}
                <svg class="w-6 h-6 transition-transform duration-300" fill={currentPath === item.path ? "currentColor" : "none"} stroke="currentColor" stroke-width={currentPath === item.path ? "0" : "2"} viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              {:else if item.icon === 'gallery'}
                <svg class="w-6 h-6 transition-transform duration-300" fill={currentPath === item.path ? "currentColor" : "none"} stroke="currentColor" stroke-width={currentPath === item.path ? "0" : "2"} viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              {:else if item.icon === 'settings'}
                <svg class="w-6 h-6 transition-transform duration-300" fill={currentPath === item.path ? "currentColor" : "none"} stroke="currentColor" stroke-width={currentPath === item.path ? "0" : "2"} viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              {/if}
            </div>
          </div>
          
          <span class="text-[10px] font-medium mt-0.5 transition-colors duration-300">{item.label}</span>
        </a>
      {/each}
    </div>
  </div>
</nav>

<style>
  nav {
    -webkit-user-select: none;
    user-select: none;
  }
  
  a {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
</style>
