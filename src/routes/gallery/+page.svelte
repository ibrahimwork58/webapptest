<script lang="ts">
  import { onMount } from 'svelte';
  import { animations } from '$lib/utils/animations';
  
  let imageElements: HTMLElement[] = [];
  let observer: IntersectionObserver;
  
  // Sample image data (using placeholder service)
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/400/400?random=${i + 1}`,
    alt: `Gallery image ${i + 1}`,
    loaded: false
  }));
  
  onMount(() => {
    // Set up Intersection Observer for lazy loading
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src && !img.src) {
              img.src = src;
              img.onload = () => {
                animations.scaleIn(img.parentElement as HTMLElement);
              };
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );
    
    // Observe all images
    imageElements.forEach((el) => {
      const img = el.querySelector('img');
      if (img) observer.observe(img);
    });
    
    return () => {
      observer.disconnect();
    };
  });
</script>

<svelte:head>
  <title>Gallery - Mobile PWA</title>
</svelte:head>

<div class="h-full smooth-scroll bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
  <div class="safe-top px-4 py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Gallery
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Lazy-loaded image grid
      </p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 pb-8">
      {#each images as image, i}
        <div
          bind:this={imageElements[i]}
          class="aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 gpu-accelerated will-animate opacity-0"
        >
          <img
            data-src={image.src}
            alt={image.alt}
            class="w-full h-full object-cover gpu-accelerated"
            loading="lazy"
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  img {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  img:active {
    transform: scale(0.95);
  }
</style>
