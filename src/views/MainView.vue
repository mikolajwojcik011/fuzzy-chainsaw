<script lang="ts">

export default {
  name: "MainView"
}
</script>
<template>
  <div class="w-screen h-screen flex justify-center">
    <div class="flex flex-col 2xl:w-3/5 xl:w-3/5 lg:w-4/5 w-full">
      <!-- rozwiąż -->
      <div class="self flex flex-1 flex-col sm:flex-row justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Rozwiąrz test</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="public-key" class="block text-sm font-medium leading-6 text-gray-900">Klucz publiczny</label>
              <div class="mt-2">
                <input id="public-key" name="public-key" type="text" required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Rozwiąrz
                test</button>
            </div>
          </form>
        </div>
      </div>
      <!-- zobacz -->
      <div class="flex flex-1 flex-col sm:flex-row justify-center px-6 py-12 lg:px-8">
        <div class="md:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Zobacz wyniki</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="public-key" class="block text-sm font-medium leading-6 text-gray-900">Klucz publiczny</label>
              <div class="mt-2">
                <input id="public-key" name="public-key" type="text" required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="private-key" class="block text-sm font-medium leading-6 text-gray-900">Klucz
                  prywatny</label>
              </div>
              <div class="mt-2">
                <input id="private-key" name="private-key" type="text" required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Wyniki</button>
            </div>
          </form>
        </div>
      </div>
      <!-- swtórz -->
      <div class="flex flex-1 flex-col sm:flex-row justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Stwórz test</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <router-link to="/Create-Test">
                <button @submit.prevent="" type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Stwórz
              </button>
            </router-link>
            </div>
          </form>
        </div>
      </div>
      <!-- modyfikuj -->
      <div class="flex flex-1 flex-col sm:flex-row justify-center px-6 py-6 lg:px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Modyfikuj test</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Modyfkuj</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>