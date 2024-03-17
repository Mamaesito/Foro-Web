<div id="initial-card" class="bg-gray-100 dark:bg-slate-700 shadow-lg ml-20 mr-10 w-9/12 h-52 flex justify-start items-start relative rounded-xl">
                <img class="w-12 h-11 bg-blue-500 rounded-full absolute top-8 left-8" src="./assets/person-1.jpg" alt="">
                <textarea class="relative rounded-lg px-6 py-2 top-7 left-20 text-2xl text-gray-400 bg-gray-100 dark:bg-slate-700 w-10/12 resize-none outline-none -h-28 font-semibold" rows="5" maxlength="380">What's in your mind?</textarea>

                <div class="flex absolute bottom-3 left-8 gap-2">
                    <a class="text-white font-bold bg-gray-400 dark:bg-gray-500 rounded-full px-4 py-1 text-center" href="">#NoMoreHunger</a>
                    <a class="text-white font-bold bg-gray-400 dark:bg-gray-500 rounded-full px-4 py-1 text-center" href="">#EndIt</a><a class="text-white font-bold bg-gray-400 dark:bg-gray-500 rounded-full px-4 py-1 text-center" href="">#Justice</a>
                </div>
                <script>
                    const card = document.getElementById('initial-card')
                    const textArea = document.querySelector('textarea')
                    const maxlength = 250;

                    textArea.addEventListener('input', () => {
                        const value = textArea.value.length
                        if ( value > maxlength) {
                            card.classList.remove('h-52')
                            card.classList.add('h-64')
                            card.classList.add('transtion-all')
                        } else{
                            card.classList.remove('h-64')
                            card.classList.add('h-52')
                        }
                    })

                    textArea.addEventListener("focus", function () {
                        if (this.value === "What's in your mind?") {
                            this.value = "";
                        }
                    });
                    textArea.addEventListener('blur', function () {
                        if (this.value === '') {
                            this.value = "What's in your mind?";
                        }
                    });

                </script>
                <div class="flex absolute bottom-3 right-5 gap-2">
                    <div class="text-gray-400 w-8 h-8 pt-1 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="fill-current" d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"/></svg>
                    </div>
                    <div class="text-gray-400 w-8 h-8 mr-3 pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fill-current" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
                    </div>
                    <a id="share" class="text-white font-semibold bg-blue-400 dark:bg-blue-500 rounded-full px-7 py-1 text-center" href="">Share</a>
                </div>
            </div>