// Debug functions
window.showDebug = function(msg) {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.left = '10px';
    div.style.backgroundColor = 'rgba(0,0,0,0.8)';
    div.style.color = 'white';
    div.style.padding = '10px';
    div.style.zIndex = '99999';
    div.innerHTML = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
};

// ===== Platform 클래스 =====
class Platform {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.div = document.createElement("div");
        this.div.style.backgroundColor = '#888888';
        this.div.style.position = "absolute";
        this.div.style.zIndex = "1";

        document.body.appendChild(this.div);
    }

    update(cameraX = 0, cameraY = 0) {
        this.div.style.left = (this.x - cameraX) + 'px';
        this.div.style.top = (this.y - cameraY) + 'px';
        this.div.style.width = this.w + 'px';
        this.div.style.height = this.h + 'px';
    }

    remove() {
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    }
}
class VanishingPlatform extends Platform {
    constructor(x, y, w, h, r, code) {
        super(x, y, w, h);
        this.code = code;
        this.r = r; // 사라지는 반경
        this.vanished = code ? true : false; // 사라졌는지 여부
        this.div.style.backgroundColor = '#888888';
        this.div.style.opacity = '1';
    }
    
    update(player) {
        if ((this.code && this.vanished) || (!this.code && !this.vanished)) {
            // 플레이어가 플랫폼 가까이 있는지 확인
            if (Math.sqrt((player.x + player.w / 2 - (this.x + this.w / 2)) ** 2 +
                          (player.y + player.h - this.y) ** 2) < this.r) {
                this.vanished = this.code ? false : true;

            }
        }
        if(this.vanished){
                    this.div.style.display = 'none';
                } else {
                    this.div.style.display = 'block';
        }
    }
    CameraUpdate(cameraX = 0, cameraY = 0) {
        this.div.style.left = (this.x - cameraX) + 'px';
        this.div.style.top = (this.y - cameraY) + 'px';
        this.div.style.width = this.w + 'px';
        this.div.style.height = this.h + 'px';
    }
    remove() {
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    }
}
// ===== Player 클래스 =====
class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.jumpPower = 7; // 점프력을 변수로 설정

        this.div = document.createElement("div");
        this.div.style.backgroundColor = '#FFFFFF';
        this.div.style.position = "absolute";
        this.div.style.zIndex = "2";

        document.body.appendChild(this.div);
        this.update();
    }

    update(cameraX = 0, cameraY = 0) {
        this.div.style.left = (this.x - cameraX) + 'px';
        this.div.style.top = (this.y - cameraY) + 'px';
        this.div.style.width = this.w + 'px';
        this.div.style.height = this.h + 'px';
    }

    remove() {
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    }
}

// ===== Goal 클래스 =====
class Goal {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.w = size;
        this.h = size;

        this.div = document.createElement("div");
        this.div.style.backgroundColor = 'gold';
        this.div.style.position = "absolute";
        this.div.style.zIndex = "3";
        this.div.style.borderRadius = "50%";
        this.div.style.boxShadow = "0 0 10px 3px gold";

        document.body.appendChild(this.div);
        this.update();
    }

    update(cameraX = 0, cameraY = 0) {
        this.div.style.left = (this.x - cameraX) + 'px';
        this.div.style.top = (this.y - cameraY) + 'px';
        this.div.style.width = this.w + 'px';
        this.div.style.height = this.h + 'px';
    }

    remove() {
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    }
}

class Spike {
    constructor(x, y, w, h, code = true, r = 0) {
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.code = code;
        this.isExist = code;

        this.div = document.createElement("div");
        this.div.style.backgroundColor = 'red';
        this.div.style.position = "absolute";
        this.div.style.zIndex = "10";  // 높은 zIndex로 설정
        this.div.style.opacity = "1";
        this.div.style.display = 'block'
        this.div.style.opacity = '1';

        document.body.appendChild(this.div);
    }

    update(cameraX = 0, cameraY = 0, player=null) {
        this.div.style.left = (this.x - cameraX) + 'px';
        this.div.style.top = (this.y - cameraY) + 'px';
        this.div.style.width = this.w + 'px';
        this.div.style.height = this.h + 'px';
        if(!this.code){
            if(Math.sqrt((player.x + player.w / 2 - (this.x + this.w / 2)) ** 2 +
                          (player.y + player.h - this.y) ** 2) < this.r) {
                this.isExist = !this.code;
            }
        }

        if(this.isExist){
            this.div.style.display = 'block';
        } else {
            this.div.style.display = 'none';
        }
        this.div.style.display = this.isExist ? 'block' : 'none';
    }

    remove() {
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    }
}
class VanishingSpike extends VanishingPlatform {
    constructor(x, y, w, h, r, code) {
        console.log('VanishingSpike constructor called with:', {x, y, w, h, r, code});
        super(x, y, w, h, r, code);
        this.div.style.backgroundColor = 'red';
    }
    update(player) {
        console.log('VanishingSpike update:', {
            x: this.x, y: this.y,
            playerX: player.x, playerY: player.y,
            vanished: this.vanished,
            code: this.code
        });
        if ((this.code && this.vanished) || (!this.code && !this.vanished)) {
            // 플레이어가 플랫폼 가까이 있는지 확인
            if (Math.sqrt((player.x + player.w / 2 - (this.x + this.w / 2)) ** 2 +
                          (player.y + player.h - this.y) ** 2) < this.r) {
                this.vanished = this.code ? false : true;

            }
        }
        if(this.vanished){
                    this.div.style.display = 'none';
                } else {
                    this.div.style.display = 'block';
        }
    }
    cameraUpdate(cameraX = 0, cameraY = 0) {
        this.div.style.left = (this.x - cameraX) + 'px';
        this.div.style.top = (this.y - cameraY) + 'px';
        this.div.style.width = this.w + 'px';
        this.div.style.height = this.h + 'px';
    }
    remove() {
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    }
}
class Teleporter extends Platform{
    constructor(x,y,w,h,vx,vy){
        super(x,y,w,h);
        if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
        this.vx = vx;
        this.vy = vy;
    }
    update(a,b){
        //useless
    }
    remove(){}
}
class MovingSpike extends Spike{
    constructor(x,y,w,h,code=true,r=0,vx=0,vy=0,timer=0){
        super(x,y,w,h,code,r);
        this.vx = vx;
        this.vy = vy;
        this.timer = timer;
    }
    update(cameraX = 0, cameraY = 0, player=null) {
        if(this.timer <= 0){
            this.x += this.vx;
            this.y += this.vy;
        }else{
            this.timer--;
        }
        super.update(cameraX, cameraY, player);
    }
}

// ===== UI 요소 생성 =====
const titleScreen = document.createElement("div");
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
titleScreen.innerText = `아주 쉬운 플랫폼 게임\n[${isMobile ? '화면을 터치하여 시작' : '스페이스바로 시작'}]`;
titleScreen.style.position = "fixed";
titleScreen.style.padding = "20px";
titleScreen.style.top = "50%";
titleScreen.style.left = "50%";
titleScreen.style.transform = "translate(-50%, -50%)";
titleScreen.style.color = "#000";
titleScreen.style.fontSize = "32px";
titleScreen.style.textAlign = "center";
titleScreen.style.whiteSpace = "pre-line";
titleScreen.style.zIndex = "10000";
titleScreen.style.display = "none";
document.body.appendChild(titleScreen);

const loadingScreen = document.createElement("div");
loadingScreen.innerText = "Loading...";
loadingScreen.style.position = "fixed";
loadingScreen.style.padding = "20px";
loadingScreen.style.top = "50%";
loadingScreen.style.left = "50%";
loadingScreen.style.transform = "translate(-50%, -50%)";
loadingScreen.style.color = "#000";
loadingScreen.style.fontSize = "32px";
loadingScreen.style.textAlign = "center";
loadingScreen.style.whiteSpace = "pre-line";
loadingScreen.style.zIndex = "10000";
document.body.appendChild(loadingScreen);

const gameOverScreen = document.createElement("div");
gameOverScreen.innerText = "실패한, 그것은 매우 슬픈!\n당신은 떨어져 공허에 갇혔습니다.\n[R키를 눌러 타이틀로]";
gameOverScreen.style.position = "fixed";
gameOverScreen.style.top = "50%";
gameOverScreen.style.left = "50%";
gameOverScreen.style.transform = "translate(-50%, -50%)";
gameOverScreen.style.color = "red";
gameOverScreen.style.fontSize = "32px";
gameOverScreen.style.textAlign = "center";
gameOverScreen.style.whiteSpace = "pre-line";
gameOverScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
gameOverScreen.style.padding = "20px";
gameOverScreen.style.borderRadius = "10px";
gameOverScreen.style.zIndex = "10000";
gameOverScreen.style.display = "none";
document.body.appendChild(gameOverScreen);

// ===== 상태 변수 =====
let gameState = "title"; // 'title', 'playing', 'gameover', 'clear'
let player, platforms, goal, camera, vanishingPlatforms, VanishingSpikes, Teleporters;
let currentStage = 0;
let GameOverMassage = ["실패한, 그것은 매우 슬픈!","당신은 죽었습니다.","와! 게임 오버!","정말 슬픈 일이네요. 당신은 실패했습니다.","와우 죽었군요 하하하","ㅋ"];
// ===== Objects 배열 =====
platforms = [];
spikes = [];
vanishingPlatforms = [];
VanishingSpikes = [];
Teleporters = [];
MovingSpikes = [];

// ===== 스테이지 데이터 =====
// 각 스테이지마다 플랫폼 배열과 골 위치 설정
const stages = [
    {
        platforms: [
            {x: 0, y: 300, w: 300, h: 50},
            {x: 500, y: 300, w: 400, h: 50},
        ],
        spikes: [],
        vanishingPlatforms: [
            {x: 300, y: 300, w: 200, h: 50, r: 100 , code: false},
        ],
        VanishingSpikes: [],
        Teleporters: [],
        MovingSpikes: [],
        goal: {x: 850, y: 250, size: 50},
    },
    {
        platforms: [
            {x: 0, y: 400, w: 200, h: 50},
            {x: 300, y: 400, w: 200, h: 50},
            {x: 600, y: 400, w: 200, h: 50},
            {x: 900, y: 400, w: 200, h: 50},
            {x: 1200, y: 400, w: 200, h: 50},

            {x: 500, y: 1500, w: 50, h: 50,},
            {x: 600, y: 1500, w: 50, h: 50,},
            {x: 450, y: 1800, w: 50, h: 50,},
            {x: 500, y: 1850, w: 150, h: 50},
            {x: 650, y: 1800, w: 50, h: 50,},
        ],
        spikes: [],
        vanishingPlatforms: [
            {x: 590, y: 0, w: 50, h: 400, r: 350 , code: true},
            {x: -600, y: 400, w: 400, h: 50, r: 300 , code: true},
            {x: -1200, y: 400, w: 400, h: 50, r: 300 , code: true},
            {x: -1800, y: 400, w: 400, h: 50, r: 300 , code: true},
        ],
        VanishingSpikes: [],
        Teleporters: [],
        MovingSpikes: [],
        goal: {x: -1800, y: 300, size: 50},
    },
    {
        platforms: [
            {x: -100, y: 500, w: 700, h: 50},
            {x: 600, y: 400, w: 300, h: 150},
            {x: 1000, y: 600, w: 300, h: 50},
        ],
        spikes: [
            {x: 400, y: 450, w: 50, h: 50, code: true, r: 0},
            {x: 1, y: 500, w: 1, h: 1, code: true, r: 0},
            {x: 800, y: 350, w: 50, h: 50, code: false, r: 100},
            {x: 500, y: 950, w: 50, h: 50, code: false, r: 100},
            {x: -500, y: 800, w: 800, h: 50, code: false, r: 100},
            {x: 1000, y: 599, w: 300, h: 1, code: false, r: 100}
        ],
        vanishingPlatforms: [
            {x: 0, y: 1000, w: 1200, h: 50, r: 500 , code: true},
        ],
        VanishingSpikes: [
            {x: 550, y: 950, w: 50, h: 50, r: 100 , code: false},
        ],
        Teleporters: [],
        MovingSpikes: [],
        goal: {x: 0, y: 950, size: 50},
    },
    {
        platforms: [
            {x: 0, y: 500, w: 300, h: 50},
            {x: 500, y: 500, w: 300, h: 50},
            {x: 1000, y: 500, w: 300, h: 50},
            {x: 1500, y: 500, w: 300, h: 50},
            {x: 2000, y: 500, w: 300, h: 50},
        ],
        spikes: [],
        vanishingPlatforms: [],
        VanishingSpikes: [],
        Teleporters: [
            {x: 1250, y: 400, w: 50, h: 50, vx: -500, vy: 0},
            {x: 300, y: 1000, w: 200, h: 50, vx: 1700, vy: -1300}
        ],
        MovingSpikes: [],
        goal: {x: 2250, y: 400, size: 50}
    },
    {
        platforms: [
            {x: 0, y: 500, w: 300, h: 50},
            {x: 500, y: 500, w: 300, h: 50},
            {x: 1000, y: 500, w: 300, h: 50},
            {x: 1500, y: 500, w: 300, h: 50},
            {x: 2000, y: 500, w: 800, h: 50},
            {x: 300, y: -2000, w: 200, h: 50},
        ],
        spikes: [
            {x: 300, y: -2500, w: 10, h:500},
            {x: 490, y: -2500, w: 10, h:500},
            {x: 2400, y: 400, w: 50, h: 50, code: false, r: 100}
        ],
        vanishingPlatforms: [],
        VanishingSpikes: [
            {x: 2300, y: 450, w: 50, h: 50, r: 80, code: false}
        ],
        Teleporters: [
            {x: 300, y: 700, w: 200, h: 50, vx: 0, vy: -3700},
            {x: 2200, y: 300, w: 10, h: 200, vx: -2200, vy: 0},
            {x: -200, y: 500, w: 50, h: 50, vx: 2800, vy: -100},
        ],
        MovingSpikes: [],
        goal: {x: 2250, y: 400, size: 50}
    },
    {
        platforms: [
            {x: 0, y: 500, w: 300, h: 50},
            {x: 500, y: 500, w: 300, h: 50},
            {x: 1000, y: 500, w: 300, h: 50},
            {x: 1500, y: 500, w: 50, h: 50},
            {x: 1700, y: 500, w: 50, h: 50},
            {x: 1900, y: 500, w: 50, h: 50},
            {x: 2100, y: 500, w: 50, h: 50},
            {x: 2300, y: 500, w: 400, h: 50},
            {x: 2000, y: 900, w: 900, h: 50},
            {x: 1700, y: 900, w: 700, h: 50}
        ],
        spikes: [
            {x: 0, y: 640, w: 2700, h: 10},
            {x: 1125, y: 450, w: 50, h: 50},
            {x: 2625, y: 450, w: 50, h: 50},
            {x: 2650, y: 850, w: 50, h: 50},
        ],
        vanishingPlatforms: [],
        VanishingSpikes: [],
        Teleporters: [],
        MovingSpikes: [
            {x: -1000, y: 0, w: 10, h: 2000, code: true, r: 0, vx: 20, vy: 0, timer: 1200},
        ],
        goal: {x: 1700, y: 850, size: 50}
    },
    {
        platforms: [
            // 시작 플랫폼 (더 넓게)
            {x: 0, y: 500, w: 200, h: 30},
            // 중간 플랫폼들 (더 넓게, 높이차 조정)
            {x: 300, y: 450, w: 100, h: 30},
            {x: 600, y: 400, w: 100, h: 30},
            {x: 900, y: 350, w: 100, h: 30},
            {x: 1200, y: 300, w: 100, h: 30},
            // 텔레포터 구간 플랫폼
            {x: 1250, y: 250, w: 200, h: 30},
            // 최종 구간 플랫폼
            {x: 2500, y: 300, w: 300, h: 30}
        ],
        spikes: [
            // 바닥 전체를 덮는 가시
            {x: -100, y: 800, w: 2000, h: 50, code: true, r: 0},
            // 첫 번째 텔레포터 화살표 (함정 텔레포터)
            {x: 1290, y: 130, w: 10, h: 40, code: true, r: 0}, // 왼쪽 대각선
            {x: 1330, y: 130, w: 10, h: 40, code: true, r: 0}, // 오른쪽 대각선
            {x: 1310, y: 110, w: 10, h: 60, code: true, r: 0}, // 중앙 축
            // 두 번째 텔레포터 화살표 (진짜 텔레포터)
            {x: 1390, y: 130, w: 10, h: 40, code: true, r: 0}, // 왼쪽 대각선
            {x: 1430, y: 130, w: 10, h: 40, code: true, r: 0}, // 오른쪽 대각선
            {x: 1410, y: 110, w: 10, h: 60, code: true, r: 0}  // 중앙 축
        ],
        vanishingPlatforms: [
            // 사라지는 발판들 (플레이어가 가까이 가면 나타남)
            {x: 150, y: 450, w: 100, h: 30, r: 200, code: true},
            {x: 450, y: 400, w: 100, h: 30, r: 200, code: true},
            {x: 750, y: 350, w: 100, h: 30, r: 200, code: true},
            {x: 1050, y: 300, w: 100, h: 30, r: 200, code: true}
        ],
        VanishingSpikes: [
            // 사라지는 가시들 (플레이어가 가까이 가면 사라짐)
            {x: 300, y: 420, w: 50, h: 20, r: 150, code: false},
            {x: 600, y: 370, w: 50, h: 20, r: 150, code: false},
            {x: 900, y: 320, w: 50, h: 20, r: 150, code: false}
        ],
        Teleporters: [
            // 함정 텔레포터
            {x: 1300, y: 170, w: 30, h: 30, vx: -1300, vy: 200},
            // 진짜 텔레포터
            {x: 1400, y: 170, w: 30, h: 30, vx: 1200, vy: 0}
        ],
        MovingSpikes: [
            // 좌우로 움직이는 가시 (속도 감소, 시작 위치 조정)
            {x: 200, y: 350, w: 30, h: 30, code: true, r: 0, vx: -3, vy: 1, timer: 200},
            {x: 500, y: 300, w: 30, h: 30, code: true, r: 0, vx: -3, vy: 1, timer: 300},
            {x: 800, y: 250, w: 30, h: 30, code: true, r: 0, vx: -3, vy: 1, timer: 400},
            // 마지막 구간의 추격 가시 (속도 감소)
            {x: -100, y: 200, w: 50, h: 200, code: true, r: 0, vx: 6, vy: 0, timer: 700}
        ],
        goal: {x: 2700, y: 250, size: 50}
    },
    {
        platforms: [
            {x: -500, y: 500, w: 100, h: 50},
            {x: -300, y: 600, w: 100, h: 50},
            {x: -100, y: 700, w: 200, h: 50},
            {x: 200, y: 600, w: 100, h: 50},
            {x: 400, y: 500, w: 100, h: 50},
            {x: -500, y: 900, w: 1000, h: 50},
        ],
        spikes: [],
        vanishingPlatforms: [],
        VanishingSpikes: [],
        Teleporters: [],
        MovingSpikes: [
            {x: -1000, y: 800, w: 2000, h: 10, code: true, r: 0, vx: 0, vy: 10, timer: 1200},

            {x: -50, y: -500, w: 100, h: 300, code: true, r: 0, vx: 0, vy: 10, timer: 100},
        ],
        goal: {x: -25, y: 850, size: 50}
    },
];

// ===== 키 입력 처리 =====
let keys = {};
function AddKeyInput() {
    // 모바일 디바이스 체크
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // 모바일 컨트롤 설정
    if (isMobile) {
        const leftBtn = document.getElementById('leftButton');
        const rightBtn = document.getElementById('rightButton');
        const jumpBtn = document.getElementById('jumpButton');
        
        // 터치 이벤트 - 게임 상태 변경
        document.addEventListener('touchstart', (e) => {
            if (gameState === "title") {
                titleScreen.style.display = "none";
                // 모바일에서는 전체화면 요청
                document.documentElement.requestFullscreen().catch(err => console.log('전체화면 전환 실패:', err));
                initGame();
                gameState = "playing";
            } else if (gameState === "gameover" || gameState === "clear") {
                gameOverScreen.style.display = "none";
                clearScreen.style.display = "none";
                resetToTitle();
            }
        });

        // 이동 버튼 이벤트
        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keys['arrowleft'] = true;
        });
        leftBtn.addEventListener('touchend', () => keys['arrowleft'] = false);

        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keys['arrowright'] = true;
        });
        rightBtn.addEventListener('touchend', () => keys['arrowright'] = false);

        jumpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (gameState === "playing" && player && player.onGround) {
                player.vy = -player.jumpPower;
                if(sounds[0]) {
                    sounds[0].currentTime = 0;
                    sounds[0].play();
                }
                player.onGround = false;
            }
        });
    }

    // 키보드 이벤트
    window.addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        keys[key] = true;
        if (!isMobile && gameState === "title" && key === " ") {
            titleScreen.style.display = "none";
            document.documentElement.requestFullscreen().catch(err => console.log('전체화면 전환 실패:', err));
            initGame();
            gameState = "playing";
        } else if (gameState === "playing" && key === "backspace") {
            e.preventDefault();
            resetToTitle();
        } else if ((gameState === "gameover" || gameState === "clear") && key.toLowerCase() === "r") {
            gameOverScreen.style.display = "none";
            clearScreen.style.display = "none";
            resetToTitle();
        }
    });
}
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// ===== 초기화 함수 =====
function initGame() {
    console.log('Initializing game for stage:', currentStage);
    keys = {};
    // 기존 게임 오브젝트 제거
    if (player) player.remove();
    platforms.forEach(p => p.remove());
    platforms = [];
    if (goal) goal.remove();
    goal = null;
    spikes.forEach(s => s.remove());
    spikes = [];
    vanishingPlatforms.forEach(vp => vp.remove());
    vanishingPlatforms = [];
    VanishingSpikes.forEach(vs => vs.remove());
    VanishingSpikes = [];
    Teleporters = [];
    MovingSpikes.forEach(ms => ms.remove());
    MovingSpikes = [];
    
    console.log('Stage data:', stages[currentStage]);
    

    // 새 게임 오브젝트 생성
    if (player) {
        player.remove();
        player = null;
    }
    player = new Player(0, 0, 50, 50);

    const stageData = stages[currentStage];

    stageData.platforms.forEach(pdata => {
        platforms.push(new Platform(pdata.x, pdata.y, pdata.w, pdata.h));
    });
    console.log('Creating spikes for stage:', currentStage);
    stageData.spikes.forEach((sdata, idx) => {
        console.log('Creating spike', idx, sdata);
        spikes.push(new Spike(sdata.x, sdata.y, sdata.w, sdata.h, sdata.code, sdata.r));
    });
    console.log('Creating vanishing platforms');
    stageData.vanishingPlatforms.forEach(vpdata => {
        vanishingPlatforms.push(new VanishingPlatform(vpdata.x, vpdata.y, vpdata.w, vpdata.h, vpdata.r, vpdata.code));
    });
    console.log('Creating vanishing spikes');
    stageData.VanishingSpikes.forEach((vsdata, idx) => {
        console.log('Creating vanishing spike', idx, vsdata);
        VanishingSpikes.push(new VanishingSpike(vsdata.x, vsdata.y, vsdata.w, vsdata.h, vsdata.r, vsdata.code));
    });
    console.log('making teleporters');
    stageData.Teleporters.forEach((Tps,idx) => {
        console.log('making teleporter',idx,Tps);
        Teleporters.push(new Teleporter(Tps.x, Tps.y, Tps.w, Tps.h, Tps.vx, Tps.vy));
    });
    console.log('Creating moving spikes');
    stageData.MovingSpikes.forEach((Msdata, idx) => {
        console.log('Creating moving spike', idx, Msdata);
        MovingSpikes.push(new MovingSpike(Msdata.x, Msdata.y, Msdata.w, Msdata.h, Msdata.code, Msdata.r, Msdata.vx, Msdata.vy, Msdata.timer));
    });

    const g = stageData.goal;
    goal = new Goal(g.x, g.y, g.size);

    camera = {
        x: 0,
        y: 0,
        update(target) {
            this.x = target.x + target.w / 2 - window.innerWidth / 2;
            this.y = target.y + target.h / 2 - window.innerHeight / 2;
        }
    };
}

// ===== 충돌 함수 =====
function checkCollision(a, b) {
    if (!a) {
        console.error("checkCollision 오류: a(player)가 undefined입니다", a, b);
        return false;
    }
    if (!b) {
        console.error("checkCollision 오류: b(platform 또는 goal)가 undefined입니다", a, b);
        return false;
    }
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function resolveCollision(player, plat) {
    const prevY = player.y - player.vy;
    const prevX = player.x - player.vx;

    if (prevY + player.h <= plat.y && player.y + player.h >= plat.y) {
        // 아래서 위로 (바닥)
        player.y = plat.y - player.h;
        player.vy = 0;
        player.onGround = true;
    } else if (prevY >= plat.y + plat.h && player.y <= plat.y + plat.h) {
        // 위에서 아래로 (천장)
        player.y = plat.y + plat.h;
        player.vy = 0;
    } else if (prevX + player.w <= plat.x && player.x + player.w >= plat.x) {
        // 왼쪽 벽 충돌
        player.x = plat.x - player.w;
        player.vx = 0;
    } else if (prevX >= plat.x + plat.w && player.x <= plat.x + plat.w) {
        // 오른쪽 벽 충돌
        player.x = plat.x + plat.w;
        player.vx = 0;
    }
}
function gameOver() {
    if (!gameOverScreen) {
        alert("gameOverScreen이 없음!");
    }
    console.log("플레이어 낙사 - 게임오버 표시");
    gameState = "gameover";
    gameOverScreen.style.display = "block";
    gameOverScreen.style.visibility = "visible";
    gameOverScreen.style.opacity = "1";
    gameOverScreen.innerText = GameOverMassage[Math.floor(Math.random()*GameOverMassage.length)]+"\n당신은 떨어져 공허에 갇혔습니다.\n[R키를 눌러 타이틀로]";
}
const speed = 3;
const jump = 7;
// ===== 게임 루프 =====
function gameLoop() {
    if (gameState === "playing") {


        // 좌우 이동
        if (keys["arrowleft"] || keys["a"]) player.vx = -speed;
        else if (keys["arrowright"] || keys["d"]) player.vx = speed;
        else player.vx = 0;

        // 점프
        if ((keys["arrowup"] || keys["w"]) && player.onGround) {            
            // 🎧 점프 시 소리 재생 로직 추가
            if (sounds.length > 0) {
                sounds[0].currentTime = 0.1; // 재생 위치를 처음으로 돌림
                sounds[0].play().catch(e => console.log("점프 소리 재생 실패:", e));
            }
            player.vy = -player.jumpPower;
            player.onGround = false;
        }

        // 중력
        player.vy += 0.2; // 중력 가속도

        // 위치 업데이트
        player.x += player.vx;
        player.y += player.vy;

        // 충돌 체크
        player.onGround = false;
        for (let plat of platforms) {
            if (checkCollision(player, plat)) {
                resolveCollision(player, plat);
            }
        }
        for (let spike of spikes) {
            if (checkCollision(player, spike) && spike.isExist) {
                gameOver();
                break;
            }
        }
        for (let Teleporter of Teleporters) {
            if(checkCollision(player, Teleporter)) {
                player.x += Teleporter.vx;
                player.y += Teleporter.vy;
            }
        }
        
        //업데이트
        for (let vplat of vanishingPlatforms) {
            vplat.update(player);
        }
        for (let vplat of vanishingPlatforms) {
            if (checkCollision(player, vplat) && !vplat.vanished) {
                resolveCollision(player, vplat);
            }
        }
        for (let vspike of VanishingSpikes) {
            vspike.update(player);
        }
        for (let vspike of VanishingSpikes) {
            if (checkCollision(player, vspike) && !vspike.vanished) {
                gameOver();
                break;
            }
        }
        for (let mspike of MovingSpikes) {
            if (checkCollision(player, mspike) && mspike.isExist) {
                gameOver();
                break;
            }
        }


        

        // 도착점 충돌 체크
        if (checkCollision(player, goal)) {
            currentStage++;
            if (currentStage >= stages.length) {
                // 모든 스테이지 클리어
                currentStage = 0;
                gameState = "clear";
                clearScreen.style.display = "block";
                player.remove();
                platforms.forEach(p => p.remove());
                platforms = [];
                goal.remove();
                goal = null;
                spikes.forEach(s => s.remove());
                spikes = [];
                vanishingPlatforms.forEach(vp => vp.remove());
                vanishingPlatforms = [];
                VanishingSpikes.forEach(vs => vs.remove());
                VanishingSpikes = [];
                Teleporters = [];
                MovingSpikes.forEach(ms => ms.remove());
                MovingSpikes = [];
            } else {
                // 다음 스테이지 시작
                initGame();

            }
        }

        // 낙사 처리
        if (player.y > 2000) {
            gameOver();
        }

        // 카메라 업데이트
        camera.update(player);

        // 화면 갱신
        player.update(camera.x, camera.y);
        platforms.forEach(p => p.update(camera.x, camera.y));
        if (goal) goal.update(camera.x, camera.y);
        spikes.forEach(s => s.update(camera.x, camera.y, player));
        vanishingPlatforms.forEach(vp => vp.CameraUpdate(camera.x, camera.y));
        VanishingSpikes.forEach(vs => vs.cameraUpdate(camera.x, camera.y));
        Teleporters.forEach(tp => tp.update(camera.x, camera.y));
        MovingSpikes.forEach(ms => ms.update(camera.x, camera.y, player));
    }
}

// ===== 클리어 화면 =====
const clearScreen = document.createElement("div");
clearScreen.innerText = "모든 스테이지 클리어!\n축하합니다!\n[R키를 눌러 타이틀로]";
clearScreen.style.position = "fixed";
clearScreen.style.top = "50%";
clearScreen.style.left = "50%";
clearScreen.style.transform = "translate(-50%, -50%)";
clearScreen.style.color = "lime";
clearScreen.style.fontSize = "32px";
clearScreen.style.textAlign = "center";
clearScreen.style.whiteSpace = "pre-line";
clearScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
clearScreen.style.padding = "20px";
clearScreen.style.borderRadius = "10px";
clearScreen.style.zIndex = "10000";
clearScreen.style.display = "none";
document.body.appendChild(clearScreen);

// ===== 타이틀 화면으로 초기화 =====
function resetToTitle() {
    gameState = "title";
    titleScreen.style.display = "block";
    gameOverScreen.style.display = "none";
    clearScreen.style.display = "none";
    loadingScreen.style.display = "none";

    if (player) player.remove();
    platforms.forEach(p => p.remove());
    platforms = [];
    if (goal) {
        goal.remove();
        goal = null;
    }
    spikes.forEach(s => s.remove());
    spikes = [];
    vanishingPlatforms.forEach(vp => vp.remove());
    vanishingPlatforms = [];
    VanishingSpikes.forEach(vs => vs.remove());
    VanishingSpikes = [];
    Teleporters = [];
    MovingSpikes.forEach(ms => ms.remove());
    MovingSpikes = [];
}

// ===== 게임 시작 =====

let sounds = []; 
sounds.push(new Audio("Sounds/jump.mp3")); 

let soundCounts = 0;
gameState = "loading";

// 로딩 화면 표시 및 텍스트 설정
loadingScreen.innerText = "Loading..."; 
loadingScreen.style.display = "block";

function checkAllSoundsLoaded() {
    if(soundCounts === sounds.length){
        loadingScreen.style.display = "none";
        resetToTitle();
        AddKeyInput();
        setInterval(gameLoop, 1000 / 120);
    }
}

if (sounds.length === 0) {
    checkAllSoundsLoaded(); // 오디오가 없으면 바로 시작
} else {
    sounds.forEach((s) => {
        // 1. 이벤트 리스너 등록: 오디오 로드가 완료될 때 (아직 완료되지 않았다면)
        const onCanPlayThrough = function() {
            soundCounts++;
            s.removeEventListener('canplaythrough', onCanPlayThrough); // 중복 실행 방지
            checkAllSoundsLoaded();
        };
        
        s.addEventListener('canplaythrough', onCanPlayThrough);

        // 2. 로드 상태 즉시 확인: 이미 로드가 완료되었을 수 있으므로
        // readyState 4는 HAVE_ENOUGH_DATA를 의미합니다. (canplaythrough가 발생했거나 곧 발생할 상태)
        if (s.readyState === 4) { 
            // 리스너가 추가되기 전에 이미 로드 완료된 경우
            soundCounts++;
            s.removeEventListener('canplaythrough', onCanPlayThrough);
            checkAllSoundsLoaded();
        }
        
        // 오디오 로드를 시작하도록 명시적으로 load()를 호출할 수도 있습니다.
        s.load(); 
    });
}
