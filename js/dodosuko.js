'use strict';

async function
dodosukoGenerator()
{
	const ctx = new AudioContext();
	const sounds = [];

	// Loading sound files
	for (const i in [...Array(5)]) {
		const uri = `./sound/ddsk${i}.mp3`;
		sounds[+i] = fetch(uri)
				.then(res => res.arrayBuffer())
				.then(buf => ctx.decodeAudioData(buf));
	}
	for (const i in sounds)
		sounds[+i] = await sounds[+i];

	const aplay = buf => {
		if (!sound.checked)
			return;
		const src = ctx.createBufferSource();
		src.buffer = buf;
		src.connect(ctx.destination);
		src.start();
	};

	let count = null;
	const max = { 'ドド': 0, 'スコ': 0, '': 0 };
	let prev = '';
	let now = 0;

	const updateStatus = () => {
		stat.textContent = 'ラブ注入♡ されるまでに';
		stat.textContent += ` ${count} 回ドドスコしました。`;
		stat.textContent += 'その途中で';
		stat.textContent += `「ドド」を ${max['ドド']} 回`;
		stat.textContent += `「スコ」を ${max['スコ']} 回`;
		stat.textContent += '連発しました。';
		play.disabled = false;
		count = null;
	};

	const love = () => {
		output.textContent += "ラブ注入♡";
		output.scrollBy(0, 99999);
		aplay(sounds[4]);
		setTimeout(updateStatus, sound.checked ? 1200 : 0);
	};

	let state = 0;
	let skcnt = 0;

	const ddsk = () => {
		if (count === null) {
			count = 0;
			output.textContent = '';
			play.disabled = true;
			state = skcnt = now = max['ドド'] = max['スコ'] = 0;
			prev = '';
		}
		state <<= 1;
		const mul = equal.checked ? 2 : 3;
		state |= (Math.random() * mul | 0) === 1;
		count++;
		const app = state & 1 ? "ドド" : "スコ";
		output.textContent += app;
		aplay(sounds[state & 1 ? (skcnt = 0) : (skcnt++ % 3 + 1)]);
		if (prev === app) {
			now++;
		} else {
			max[prev] = Math.max(max[prev], now);
			prev = app;
			now = 1;
		}
		output.scrollBy(0, 99999);
		state &= 0xFFF;
		setTimeout(state !== 0x888 ? ddsk : love,
				sound.checked ? 395 : 0);
	};

	return ddsk;
}

const dodosuko = dodosukoGenerator();

play.addEventListener('click',
	async () => (await dodosuko)());
copy.addEventListener('click',
	() => { output.select(); document.execCommand('copy'); });
tweet.addEventListener('click', () => {
	const dodosukouri = 'https://kusaremkn.github.io/dodosuko/';
	if (stat.textContent.length === 0)
		alert('ドドスコを忘れていませんか？');
	window.open('https://twitter.com/intent/tweet/?text='
			+ encodeURIComponent(stat.textContent) + '&hashtags='
			+ encodeURIComponent('ドドスコジェネレータ')
			+ '&url=' + encodeURIComponent(dodosukouri));
});
