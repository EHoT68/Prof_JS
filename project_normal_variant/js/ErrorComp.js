Vue.component('error-json', {
    template: `
        <div>
            <div class="error-block">
                <h2 class="error-block_title">ОШИБКА 404 </br>Кури бамбук</h2>
                <button class="del-btn" @click="$root.invisibl = true">&times;</button>
            </div>
        </div>
        `
});