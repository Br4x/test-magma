<script setup lang="ts">
</script>

<template>
  <aside
    class="
      sticky
      w-64
      top-0
      z-10
      flex
      h-screen
      flex-col
      justify-between
      border-r
      bg-neutral-900
      px-6
      pb-3
    "
  >
    <div>
      <a
        class="mt-4 flex w-full items-center justify-start text-white"
        href="/"
        title="account"
      >
        <img class="w-10 h-10 mr-6" src="/Avatar.png" alt="netflix logo">
        Netflix
      </a>

      <ul class="mt-10 space-y-2 tracking-wide text-neutral-300 font-medium">
        <li>
          <a
            href="#"
            aria-label="dashboard"
            class="
              relative
              flex
              items-center
              space-x-4
              rounded-full
              bg-gradient-to-r bg-neutral-700
              px-4
              py-3
            "
          >
            <i class="w-6 h-6 i-ph-stack mr-2" />
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            class="group flex items-center space-x-4 rounded-md px-4 py-3"
          >
            <i class="w-6 h-6 i-ph-users mr-2" />
            Users
          </a>
        </li>
      </ul>
    </div>

    <div>
      <a
        href="#"
        aria-label="dashboard"
        class="mb-4 px-4 py-6 flex items-center text-neutral-300 font-medium"
      >
        <i class="w-6 h-6 i-material-symbols-settings-outline mr-2" />
        Settings
      </a>

      <div
        class="
          flex
          items-center
          justify-between
          border-t
          px-6
          pt-4
          border-slate-500
        "
      >
        <button class="flex items-center rounded-md py-4 text-white">
          <img class="w-10 h-10" src="/Natali.png">
          <span class="ml-4 whitespace-nowrap">Natali Graig</span>
          <i class="w-6 h6 i-ic-twotone-logout" />
        </button>
      </div>
    </div>
  </aside>
</template>
