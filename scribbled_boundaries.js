let seed = parseInt(tokenData.hash.slice(0, 16), 16);

var hi = tokenData.hash
    .match(/.{1,2}/g)
    .splice(1, 32)
    .map(v => parseInt(v, 16)),
  count = 0;

let sp = [40, 40, 70, 120, 150, 75, 100, 150, 170, 200, 220],
  rp = hi.slice(0, 9).map(v => sp[parseInt((v * (sp.length - 1)) / 255)]),
  colors = [],
  forcount = 0,
  cw,
  S = [],
  ratio,
  T,
  minT,
  s2,
  rangey,
  rangex,
  aspectRatio,
  graphics = [],
  L = [];

function setup() {
  let ar;
  if (
    ((cw = 100),
    (s2 = Math.min(windowHeight, windowWidth) / cw),
    console.log(window.devicePixelRatio),
    console.log(s2),
    s2 * cw > cw
      ? createCanvas(s2 * cw, s2 * cw)
      : (createCanvas(cw, cw), noLoop()),
    colorMode(HSL, 255),
    background(255, 255, 255, 255),
    (S = [0.1, 0.9, 0.1, 0.9]),
    Math.ceil(((hi[7] + hi[8]) / 510) * 100) > 75)
  )
    for (let i = 0; i < 4; i++)
      S[i] = i % 2 == 0 ? N(0.12) + 0.1 : 1 - S[i - 1];
  aspectRatio = ((S[1] - S[0]) * (S[3] - S[2])) / Math.pow(0.8, 2);
  let cm = Math.ceil(((hi[0] + hi[6]) / 510) * 100);
  for (let i = 0; i < N(15) + 8; i++) {
    let c;
    cm > 60 &&
      (c = [hi[Math.ceil(N(hi.length)) - 1], N(35) + 220, 155 + N(40)]),
      (c =
        cm > 50
          ? [hi[Math.ceil(N(hi.length)) - 1], N(40), 10 + N(100)]
          : [hi[Math.ceil(N(hi.length)) - 1], N(105) + 150, N(210)]);
    let hr = rp[Math.ceil(N(rp.length)) - 1] / 2,
      sr = rp[Math.ceil(N(rp.length)) - 1],
      br = rp[Math.ceil(N(rp.length)) - 1];
    colors.push([c, hr, sr, br]);
  }
  let mc = Math.ceil(((hi[4] + hi[5]) / 510) * 210);
  L =
    mc > 185
      ? getMFramedPolygon()
      : mc > 175
      ? getMDoor()
      : mc > 135
      ? getMSplitPG()
      : mc > 120
      ? getMCircles()
      : mc > 110
      ? getMStrips()
      : mc > 100
      ? getMRectangles()
      : mc > 90
      ? getMSinglePG()
      : mc > 80
      ? getMMixed()
      : mc > 70
      ? getMGradient()
      : mc > 60
      ? getMOverlapRectangles()
      : mc > 50
      ? getMSimpleMixed()
      : mc > 40
      ? getMParting()
      : mc > 20
      ? getMAltParting()
      : getMSquares();
  let tc = Math.ceil(((hi[2] + hi[3]) / 510) * 100),
    thickScale,
    iterationScale;
  tc > 80
    ? ((thickScale = 0.75), (iterationScale = 1.3))
    : tc > 60
    ? ((thickScale = 1.3), (iterationScale = 2.5))
    : tc > 30
    ? ((thickScale = 0.9), (iterationScale = 1))
    : tc > 20
    ? ((thickScale = 2), (iterationScale = 2))
    : ((thickScale = 0.6), (iterationScale = 0.9)),
    (thickScale *= 1.3),
    (iterationScale *= 0.4),
    (forcount = 0);
  let totalii = 0;
  for (let i in L) totalii += Math.ceil(80 * L[i].ii);
  let totalL = 10,
    sPerLayer = totalii / 10,
    grindex = 0;
  createGraphic(grindex);
  for (let i in L) {
    let randomColorIndex = Math.ceil(N(colors.length)) - 1;
    for (; !colors[randomColorIndex]; )
      randomColorIndex = Math.ceil(N(colors.length)) - 1;
    let chosenColor = [
        ...colors[randomColorIndex],
        rp[Math.ceil(N(rp.length)) - 1],
      ],
      ShArr = L[i].type,
      color2 = chosenColor[0].map(v => Math.ceil(v));
    for (let l = 0; l < L[i].ii * iterationScale; l++) {
      let p = Math.floor(N(40) + 60);
      forcount += p;
      let thh =
          (1.5 * cw) /
          (thickScale * L[i].T * N(4e3) + 2 * L[i].minT * thickScale),
        a;
      new scribble_gr(
        grindex,
        p,
        N(L[i].cl),
        getRandomColor(...chosenColor),
        thh,
        ShArr,
        L[i].S,
      ).display(),
        forcount > (grindex + 1) * sPerLayer &&
          (endGraphic(grindex), grindex++, createGraphic(grindex));
    }
    i == L.length - 1 && endGraphic(grindex);
  }
}

function getMSplitPG() {
  let split_o = N(1) > 0.5 ? 'v' : 'h',
    numSplit = 2,
    splitArea1 = splitRegion(2, S, split_o),
    splitArea2 = [],
    split_o2 = 'v' == split_o ? 'h' : 'v',
    splits = [];
  for (let i in splitArea1) {
    let numSplit2 = N(1) > 0.3 ? 1 : N(1) > 0.3 ? 2 : 3;
    splits.push(numSplit2),
      splitArea2.push(splitRegion(numSplit2, splitArea1[i], split_o2));
  }
  let splitArea = splitArea2.flat(),
    PGs = [],
    baseL = [],
    baseS = [];
  for (let i in splitArea) {
    let s = getPG(Math.floor(N(12)) + 6, splitArea[i]),
      minX = s[0].x,
      maxX = s[0].x,
      minY = s[0].y,
      maxY = s[0].y;
    for (let j in s)
      minX > s[j].x && (minX = s[j].x),
        maxX < s[j].x && (maxX = s[j].x),
        minY > s[j].y && (minY = s[j].y),
        maxY < s[j].y && (maxY = s[j].y);
    let shapeRatio = ((maxX - minX) * (maxY - minY)) / Math.pow(cw, 2);
    PGs.push(s), baseL.push({M: 'PG', shape: s, ratio: shapeRatio});
  }
  let _L = [];
  for (let i in PGs) {
    let ratio = getRatio(splitArea[i]),
      ii = Math.ceil(baseL[i].ratio * (N(400) + 400)),
      mT = Math.floor(N(500)) + 500,
      t = N(3) + 1,
      cl = N(4) + 11;
    _L.push({
      type: [{M: 'positive-PG', shape: PGs[i]}],
      cl: cl,
      ii: ii,
      S: splitArea[i],
      T: t,
      minT: mT,
    });
  }
  if (1 == splitArea1.length || N(1) > 0.7) {
    let ii = Math.ceil(0.8 * 0.8 * (N(300) + 600)),
      mT = Math.floor(N(500)) + 500,
      t = N(1) + 0.2;
    N(1) > 0.4 && (t = N(1) + 2);
    let cl = N(9) + 8;
    _L.push({type: baseL, S: S, cl: cl, ii: ii, T: t, minT: mT});
  } else
    for (let i = 0; i < splitArea1.length; i++) {
      let ratio = getRatio(splitArea1[i]),
        ii = Math.ceil(ratio * (N(250) + 600)),
        mT = Math.floor(N(700)) + 500,
        t = N(1) + 0.2;
      N(1) > 0.4 && (t = N(1) + 2);
      let cl = N(9) + 8;
      _L.push({type: baseL, S: splitArea1[i], cl: cl, ii: ii, T: t, minT: mT});
    }
  return _L;
}

function getMSinglePG() {
  let _L = [],
    _PGs = [],
    _pPGs = [],
    ratio = getRatio(S),
    numPGs = N(1) > 0.3 ? 1 : 2;
  for (let i = 0; i < numPGs; i++) {
    let inc2 = 0.05;
    reducedS = [S[0] + inc2, S[1] - inc2, S[2] + inc2, S[3] - inc2];
    let s = getPG(Math.floor(N(15)) + 6, reducedS),
      minX = s[0].x,
      maxX = s[0].x,
      minY = s[0].y,
      maxY = s[0].y;
    for (let j in s)
      minX > s[j].x && (minX = s[j].x),
        maxX < s[j].x && (maxX = s[j].x),
        minY > s[j].y && (minY = s[j].y),
        maxY < s[j].y && (maxY = s[j].y);
    let shapeRatio = ((maxX - minX) * (maxY - minY)) / Math.pow(cw, 2);
    _PGs.push({M: 'PG', shape: s}),
      _pPGs.push({M: 'positive-PG', shape: s, ratio: shapeRatio});
  }
  for (let i in _pPGs) {
    let ii = _pPGs[i].ratio * (N(200) + 200),
      cl = 8 + N(4);
    _L.push({type: [_pPGs[i]], S: S, minT: 500 + N(300), T: 2, ii: ii, cl: cl});
  }
  let ii = 0.8 * ratio * (N(200) + 220),
    cl = N(5) + 5,
    t = N(0.4) + 0.1,
    mT = 500 + N(200);
  return (
    N(1) > 0.4 && (t = N(1) + 1),
    N(1) > 0.5
      ? _L.push({type: _PGs, S: S, ii: ii, T: t, minT: mT, cl: cl})
      : ((ii = 0.8 * ratio * (N(200) + 200)),
        _L.push({type: _PGs, S: S, ii: ii, T: t, minT: mT, cl: cl})),
    _L
  );
}

function getMCircles() {
  let _L = [],
    numL = Math.ceil(N(5)) + 2,
    circles = getSh('circles', Math.ceil(N(12)) + 3);
  for (let i = 0; i < numL; i++) {
    let shapeArray = getSomeElements(
        circles,
        Math.floor(N(circles.length - 4)) + 3,
      ),
      ii = aspectRatio * (N(250) + 400) * (1 / numL),
      cl = N(9) + 6,
      t = N(1.5) + 0.3;
    N(1) > 0.4 && (t = N(1) + 0.7),
      N(1) > 0.25
        ? _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(300) + 450,
            cl: cl,
          })
        : ((ii = (N(350) + 350) * (1 / (numL + 3))),
          _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(500) + 450,
            cl: cl,
          }));
  }
  return _L;
}

function getMParting() {
  let _L = [],
    numL = Math.ceil(N(6)) + 3,
    parting = [];
  for (let i = 0; i < 4; i++)
    parting = [...parting, getSh('parting', Math.ceil(N(4)) + 4)];
  parting = parting.flat();
  for (let i = 0; i < numL; i++) {
    let shapeArray = getSomeElements(parting, 2),
      ii = aspectRatio * aspectRatio * (N(250) + 250) * (1 / numL),
      cl = N(10) + 8,
      t = N(1) + 0.5;
    N(1) > 0.3 && (t = N(1) + 0.3),
      N(1) > 0.25
        ? _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(200) + 450,
            cl: cl,
          })
        : ((ii = (N(500) + 400) * (1 / (numL + 2))),
          _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(250) + 200,
            cl: cl,
          }));
  }
  return _L;
}

function getMAltParting() {
  let _L = [],
    numL = Math.ceil(N(4)) + 3,
    parting = [];
  for (let i = 0; i < 5; i++)
    parting = [...parting, getSh('alt-parting', Math.ceil(N(4)) + 2)];
  parting = parting.flat();
  for (let i = 0; i < numL; i++) {
    let shapeArray = getSomeElements(
        parting,
        Math.ceil(N(parting.length / 3) + 1),
      ),
      ii = (N(300) + 300) * (1 / (numL + 3)),
      cl = N(5) + 7,
      t = N(1) + 0.1;
    N(1) > 0.3 && (t = N(1) + 0.5),
      N(1) > 0.3
        ? _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 350,
            cl: cl,
          })
        : ((ii = (N(500) + 400) * (1 / (numL + 2))),
          _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 250,
            cl: cl,
          }));
  }
  return _L;
}

function getMPG() {
  let _L = [],
    numL = Math.ceil(N(6)) + 4,
    PG = getSh('PG', Math.ceil(1 + numL / 2));
  for (let i = 0; i < numL; i++) {
    let shapeArray = getSomeElements(PG, Math.ceil(N(3))),
      ratio = getRatio(S),
      ii = Math.floor(ratio * (N(200) + 250) * (1 / (numL + 1))),
      cl = N(5) + 8,
      t = N(0.5) + 0.1;
    N(1) > 0.3 && (t = N(1) + 1),
      N(1) > 0.3
        ? _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 300,
            cl: cl,
          })
        : ((ii = ratio * (N(250) + 300) * (1 / (numL + 3))),
          _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 350,
            cl: cl,
          }));
  }
  return _L;
}

function getMMixed() {
  let _L = [],
    numL = Math.ceil(N(10)) + 2,
    Sh = [],
    MTypes = ['circles', 'parting', 'PG', 'block', 'alt-parting'];
  for (let i = 0; i < Math.floor(N(6) + 8); i++) {
    let index = Math.ceil(N(MTypes.length) - 1);
    Sh.push(getSh(MTypes[index], 2));
  }
  Sh = Sh.flat();
  for (let i = 0; i < numL; i++) {
    let shapeArray = getSomeElements(Sh, Math.ceil(N(Sh.length / 3))),
      ii = aspectRatio * (N(350) + 450) * (1 / (numL + 2)),
      cl = N(8) + 5,
      t = N(0.5) + 0.5;
    N(1) > 0.6 && (t = N(2) + 0.5),
      N(1) > 0.4
        ? _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 300,
            cl: cl,
          })
        : ((ii = (N(200) + 300) * (1 / (numL + 1))),
          (cl = N(8) + 7),
          _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 300,
            cl: cl,
          }));
  }
  return _L;
}

function getMSimpleMixed() {
  let _L = [],
    numL = Math.ceil(N(3)) + 1,
    Sh = [],
    MTypes = ['circles', 'parting', 'PG', 'alt-parting'],
    index = Math.ceil(N(MTypes.length) - 1);
  for (let i = 0; i < 5; i++)
    N(1) > 0.5 && (index = Math.ceil(N(MTypes.length) - 1)),
      Sh.push(getSh(MTypes[index], 2));
  Sh = Sh.flat();
  for (let i = 0; i < numL; i++) {
    let shapeArray = getSomeElements(Sh, 2),
      ii = aspectRatio * (N(50) + 400) * (1 / (numL + 1)),
      cl = N(5) + 5,
      t = N(0.5) + 0.5;
    N(1) > 0.5 && (t = N(2) + 0.8),
      N(1) > 0.4
        ? _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(100) + 350,
            cl: cl,
          })
        : ((ii = aspectRatio * (N(50) + 500) * (1 / (numL + 1))),
          (cl = N(10) + 4),
          _L.push({
            type: shapeArray,
            S: S,
            ii: ii,
            T: t,
            minT: N(50) + 450,
            cl: cl,
          }));
  }
  return _L;
}

function getMRectangles() {
  let co1 = N(1) > 0.5 ? 'v' : 'h';
  (regions = 0),
    (sp1 = splitRegion(
      N(10) > 5 ? 3 : N(10) > 3 ? 2 : 4,
      [0.1, 0.9, 0.1, 0.9],
      co1,
    )),
    (sp2 = []);
  for (let i in sp1) {
    let spl = N(10) > 4 ? 2 : N(10) > 4 ? 3 : N(10) > 3 ? 1 : 4;
    sp2.push(splitRegion(spl, sp1[i], 'h' == co1 ? 'v' : 'h'));
  }
  (sp2 = sp2.flat()), (sp3 = []);
  for (let i in sp2) {
    let spl2 = N(1) > 0.75 ? 2 : 1;
    (regions += spl2), sp3.push(splitRegion(spl2, sp2[i], co1));
  }
  sp3 = sp3.flat();
  let incr = 0.02;
  for (let i in sp3)
    (sp3[i][0] = sp3[i][0] == S[0] ? S[0] : sp3[i][0] - 0.02),
      (sp3[i][1] = sp3[i][1] == S[1] ? S[1] : sp3[i][1] + 0.02),
      (sp3[i][2] = sp3[i][2] == S[2] ? S[2] : sp3[i][2] - 0.02),
      (sp3[i][3] = sp3[i][3] == S[3] ? S[3] : sp3[i][3] + 0.02);
  let _L = [];
  N(10) > 1 &&
    _L.push({
      type: [{M: 'PG', shape: []}],
      S: [0.1, 0.9, 0.1, 0.9],
      ii: N(40) + 70,
      minT: 550,
      T: 1,
      cl: 7,
    });
  for (let i in sp3) {
    let ratio = getRatio(sp3[i]),
      ii = Math.ceil(ratio * (N(100) + 300)),
      mT = 550,
      t = N(2.5) + 0.1;
    N(1) > 0.4 && (t = N(1.5) + 1);
    let cl = N(7) + 5;
    _L.push({
      type: [
        {M: 'PG', shape: N(1) > 0.6 ? getPG(Math.ceil(N(8)) + 4, sp3[i]) : []},
      ],
      S: sp3[i],
      ii: ii,
      minT: mT,
      T: t,
      cl: cl,
    });
  }
  return _L;
}

function getMDoor() {
  let _L = [],
    doorW = (N(0.05) + 0.05) / 2,
    doorH = (N(0.2) + 0.3) / 2,
    room = N(0.4) + 0.03,
    t1 = S[0] + (S[1] - S[0]) / 4,
    t2 = S[0] + (3 * (S[1] - S[0])) / 4,
    ds1 = [t1 - doorW + room, t1 + doorW + room, 0.5 - doorH, 0.5 + doorH],
    ds2 = [t2 - doorW - room, t2 + doorW - room, 0.5 - doorH, 0.5 + doorH],
    dc = [
      {x: ds1[0] * cw, y: ds1[2] * cw},
      {x: ds1[1] * cw, y: ds1[2] * cw},
      {x: ds1[1] * cw, y: ds1[3] * cw},
      {x: ds1[0] * cw, y: ds1[3] * cw},
    ],
    dc2 = [
      {x: ds2[0] * cw, y: ds2[2] * cw},
      {x: ds2[1] * cw, y: ds2[2] * cw},
      {x: ds2[1] * cw, y: ds2[3] * cw},
      {x: ds2[0] * cw, y: ds2[3] * cw},
    ],
    p1 = N(0.08) + 0.04,
    p2 = N(0.08) + 0.04,
    dc3 = [
      {x: dc[0].x - p1 * cw, y: dc[0].y - p2 * cw},
      {x: dc[1].x + p1 * cw, y: dc[1].y - p2 * cw},
      {x: dc[2].x + p1 * cw, y: dc[2].y + p2 * cw},
      {x: dc[3].x - p1 * cw, y: dc[3].y + p2 * cw},
    ],
    dc4 = [
      {x: dc2[0].x - p1 * cw, y: dc2[0].y - p2 * cw},
      {x: dc2[1].x + p1 * cw, y: dc2[1].y - p2 * cw},
      {x: dc2[2].x + p1 * cw, y: dc2[2].y + p2 * cw},
      {x: dc2[3].x - p1 * cw, y: dc2[3].y + p2 * cw},
    ],
    ii = aspectRatio * (50 + N(220)),
    cl = N(5) + 8,
    mT = N(1200) + 500,
    t = N(1) + 1;
  if (N(1) > 0.3)
    _L.push({
      type: [
        {M: 'PG', shape: dc3},
        {M: 'PG', shape: dc4},
      ],
      S: S,
      ii: ii,
      T: t,
      minT: mT,
      cl: cl,
    }),
      (ii = aspectRatio * (50 + N(220))),
      (cl = N(5) + 8),
      (mT = N(1200) + 500),
      (t = N(1) + 1),
      _L.push({
        type: [
          {M: 'PG', shape: dc3},
          {M: 'PG', shape: dc4},
        ],
        S: S,
        ii: ii,
        T: t,
        minT: mT,
        cl: cl,
      });
  else {
    let S2 = [S[0], S[1] / 2, S[2], S[3]],
      S3 = [S[1] / 2, S[1], S[2], S[3]];
    _L.push({
      type: [
        {M: 'PG', shape: dc3},
        {M: 'PG', shape: dc4},
      ],
      S: S2,
      ii: ii,
      T: t,
      minT: mT,
      cl: cl,
    }),
      (ii = aspectRatio * (50 + N(220))),
      (cl = N(5) + 8),
      (mT = N(1200) + 500),
      (t = N(1) + 1),
      _L.push({
        type: [
          {M: 'PG', shape: dc3},
          {M: 'PG', shape: dc4},
        ],
        S: S3,
        ii: ii,
        T: t,
        minT: mT,
        cl: cl,
      });
  }
  return (
    (ii = aspectRatio * (50 + N(220))),
    (cl = N(5) + 8),
    (mT = N(800) + 500),
    (t = N(1) + 0.1),
    _L.push({
      type: [
        {M: 'PG', shape: dc},
        {M: 'PG', shape: dc2},
      ],
      S: S,
      ii: ii,
      T: t,
      minT: mT,
      cl: cl,
    }),
    (ii = aspectRatio * (50 + N(220))),
    (cl = N(5) + 8),
    (mT = N(800) + 500),
    (t = N(1) + 0.1),
    _L.push({
      type: [
        {M: 'PG', shape: dc},
        {M: 'PG', shape: dc2},
      ],
      S: S,
      ii: ii,
      T: t,
      minT: mT,
      cl: cl,
    }),
    _L
  );
}

function getMOverlapRectangles() {
  let co1 = N(1) > 0.5 ? 'v' : 'h',
    sp1,
    sp2,
    sp3 = [
      ...splitRegion(Math.ceil(N(2)) + 1, S, co1),
      ...splitRegion(Math.ceil(N(2)) + 1, S, 'v' == co1 ? 'h' : 'v'),
    ],
    _L = [];
  for (let i in sp3) {
    let ratio = getRatio(sp3[i]),
      ii = Math.ceil(220 * ratio),
      mT = N(50) + 300,
      t = N(1) + 1,
      cl = N(3) + 7;
    _L.push({
      type: [{M: 'PG', shape: []}],
      S: sp3[i],
      ii: ii,
      minT: mT,
      T: t,
      cl: cl,
    });
  }
  return _L;
}

function getMFramedPolygon() {
  let _L = [],
    W = N(0.3) + 0.2,
    H = N(0.3) + 0.2,
    posX = N(0.7 * S[1] - W) + 1.3 * S[0],
    posY = N(0.7 * S[3] - H) + 1.3 * S[2],
    SS = [posX, posX + W, posY, posY + H],
    SC = [
      {x: SS[0] * cw, y: SS[2] * cw},
      {x: SS[1] * cw, y: SS[2] * cw},
      {x: SS[1] * cw, y: SS[3] * cw},
      {x: SS[0] * cw, y: SS[3] * cw},
    ],
    inc = 0.05;
  SS = [SS[0] - 0.05, SS[1] + 0.05, SS[2] - 0.05, S[3] + 0.05];
  for (let i in SS)
    i < 2
      ? (SS[i] < S[0] && (SS[i] = S[0]), SS[i] > S[1] && (SS[i] = S[1]))
      : (SS[i] < S[2] && (SS[i] = S[2]), SS[i] > S[3] && (SS[i] = S[3]));
  let SS2 = [SS[0] + 0.1, SS[1] - 0.1, SS[2] + 0.1, S[3] - 0.1],
    s = getPG(Math.floor(N(15)) + 10, SS2),
    Sh = [],
    MTypes = ['circles', 'PG', 'block', 'alt-parting'];
  for (let i = 0; i < Math.floor(N(6) + 4); i++) {
    let index = Math.ceil(N(MTypes.length) - 1);
    Sh.push(getSh(MTypes[index], 2));
  }
  Sh = Sh.flat();
  let mT = N(50) + 500,
    t = N(0.3) + 0.1,
    cl = N(3) + 8,
    ii = Math.ceil(80 * aspectRatio);
  return (
    _L.push({
      type: [{M: 'PG', shape: SC}, ...getSomeElements(Sh, 4)],
      S: S,
      ii: ii,
      minT: mT,
      T: t,
      cl: cl,
    }),
    _L.push({
      type: [{M: 'positive-PG', shape: s}],
      S: SS,
      ii: ii,
      minT: 2 * mT,
      T: t,
      cl: cl,
    }),
    (ii = Math.ceil(80 * aspectRatio)),
    _L.push({
      type: [{M: 'PG', shape: SC}, ...getSomeElements(Sh, 3)],
      S: S,
      ii: ii,
      minT: mT,
      T: t,
      cl: cl,
    }),
    _L.push({
      type: [{M: 'PG', shape: s}],
      S: SS,
      ii: ii,
      minT: 1.5 * mT,
      T: t,
      cl: cl,
    }),
    (ii = Math.ceil(80 * aspectRatio)),
    _L.push({
      type: [{M: 'PG', shape: SC}, ...getSomeElements(Sh, 3)],
      S: S,
      ii: ii,
      minT: mT,
      T: t,
      cl: cl,
    }),
    _L.push({
      type: [{M: 'PG', shape: SC}, ...getSomeElements(Sh, 4)],
      S: S,
      ii: ii,
      minT: mT,
      T: t,
      cl: cl,
    }),
    _L
  );
}

function getMGradient() {
  let _L = [],
    numSteps = Math.ceil(N(2) + 5),
    rectArr = [],
    ori = N(1) > 0.5 ? 'v' : 'h',
    inc = 'v' == ori ? (S[3] - S[2]) / numSteps : (S[1] - S[0]) / numSteps;
  for (let i = 1; i <= numSteps; i++)
    'v' == ori
      ? rectArr.push([S[0], S[1], S[2], S[2] + inc * i])
      : rectArr.push([S[0], S[0] + inc * i, S[2], S[3]]);
  let MTypes = ['circles', 'parting', 'PG', 'alt-parting'],
    shapeArr = [];
  for (let i = 0; i < 10; i++) {
    let index = Math.ceil(N(MTypes.length) - 1);
    shapeArr.push(getSh(MTypes[index], 3));
  }
  shapeArr = shapeArr.flat();
  let inc2 = 0.2;
  (reducedS = [S[0] + 0.2, S[1] - 0.2, S[2] + 0.2, S[3] - 0.2]),
    N(1) > 0.5 && (shapeArr = [{M: 'PG', shape: getPG(N(10) + 5, reducedS)}]);
  let ii = 250,
    mT = 600,
    t = 0.8,
    cl = 3;
  for (let i in rectArr) {
    let ratio = getRatio(rectArr[i]);
    _L.push({
      type: getSomeElements(shapeArr, 1),
      S: rectArr[i],
      ii: (ii * ratio * 1) / numSteps,
      minT: mT,
      T: t,
      cl: 3,
    });
  }
  return _L;
}

function getMStrips() {
  let _L = [],
    numRects = Math.ceil(N(2)) + 5,
    ori = N(1) > 0.5 ? 'v' : 'h',
    inc = 'v' == ori ? (S[3] - S[2]) / numRects : (S[1] - S[0]) / numRects,
    rectArr = [];
  for (let i = 1; i <= numRects; i++)
    'v' == ori
      ? rectArr.push([S[0], S[1], S[2] + inc * (i - 1), S[2] + inc * i])
      : rectArr.push([S[0] + inc * (i - 1), S[0] + inc * i, S[2], S[3]]);
  let incr = 0.1;
  for (let i in rectArr)
    (rectArr[i][0] = rectArr[i][0] == S[0] ? S[0] : rectArr[i][0] - 0.1),
      (rectArr[i][1] = rectArr[i][1] == S[1] ? S[1] : rectArr[i][1] + 0.1),
      (rectArr[i][2] = rectArr[i][2] == S[2] ? S[2] : rectArr[i][2] - 0.1),
      (rectArr[i][3] = rectArr[i][3] == S[3] ? S[3] : rectArr[i][3] + 0.1);
  let MTypes = ['circles', 'parting', 'PG', 'alt-parting'],
    shapeArr = [];
  for (let i = 0; i < 5; i++) {
    let index = Math.ceil(N(MTypes.length) - 1);
    shapeArr.push(getSh(MTypes[index], 3));
  }
  shapeArr = shapeArr.flat();
  let ii = 150,
    mT = 600,
    t = 1.2,
    cl = 4;
  for (let i in rectArr) {
    let ratio = getRatio(rectArr[i]);
    _L.push({
      type: getSomeElements(shapeArr, Math.ceil(N(2))),
      S: rectArr[i],
      ii: ii * ratio,
      minT: mT,
      T: t,
      cl: 4,
    });
  }
  return _L;
}

function getMSquares() {
  let outerSize = S,
    ss1 = 0.8 * (N(0.4) + 0.5),
    ss2 = (N(0.3) + 0.6) * ss1,
    ss3 = (N(0.5) + 0.3) * ss2,
    ss = [ss1, ss2, ss3],
    squareCoords = [],
    squares = [],
    inc = 0.05;
  for (let i in ss) {
    let b = (cw - ss[i] * cw) / 2,
      c = (cw + ss[i] * cw) / 2,
      b1 = 0.5 - ss[i] / 2,
      c1 = 0.5 + ss[i] / 2,
      a = [
        {x: b, y: c},
        {x: c, y: c},
        {x: c, y: b},
        {x: b, y: b},
      ],
      d = [b1 - 0.05, c1 + 0.05, b1 - 0.05, c1 + 0.05];
    squareCoords.push(a), squares.push(d);
  }
  let _L = [],
    ii = Math.ceil(N(50) + 320),
    mT = 600,
    t = N(2) + 0.5;
  N(1) > 0.4 && (t = N(2) + 0.5);
  let cl = 5;
  return (
    _L.push({
      type: [{M: 'PG', shape: squareCoords[0]}],
      S: outerSize,
      ii: Math.ceil(0.8 * ii),
      minT: mT,
      T: t,
      cl: N(4) + 4,
    }),
    _L.push({
      type: [{M: 'PG', shape: squareCoords[1]}],
      S: squares[0],
      ii: Math.ceil(0.6 * ss1 * ii),
      minT: mT,
      T: t,
      cl: N(4) + 5,
    }),
    _L.push({
      type: [{M: 'PG', shape: squareCoords[2]}],
      S: squares[1],
      ii: Math.ceil(0.6 * ss2 * ii),
      minT: mT,
      T: t,
      cl: N(4) + 5,
    }),
    _L.push({
      type: [{M: 'PG', shape: []}],
      S: squares[2],
      ii: Math.ceil(ss3 * ss3 * ii),
      minT: mT,
      T: t,
      cl: N(4) + 7,
    }),
    _L
  );
}

function createGraphic(i) {
  (graphics[i] =
    s2 * cw > cw ? createGraphics(s2 * cw, s2 * cw) : createGraphics(cw, cw)),
    graphics[i].noLoop(),
    graphics[i].colorMode(HSL, 255),
    s2 * cw > cw && graphics[i].scale(s2),
    graphics[i].push();
}

function endGraphic(i) {
  graphics[i].pop();
}

function getRatio(SArr) {
  return (
    (rangex = SArr[1] - SArr[0]),
    (rangey = SArr[3] - SArr[2]),
    (ratio = (rangex * rangey) / (0.8 * 0.8)),
    (ratio = Math.ceil(1e3 * ratio) / 1e3),
    ratio
  );
}

function splitRegion(split, region, o) {
  if (1 == split) return [region];
  if (2 == split) {
    let co = N(0.5) + 0.25,
      cov = co * (region[1] - region[0]) + region[0],
      coh = co * (region[3] - region[2]) + region[2];
    return [
      [
        region[0],
        'v' == o ? cov : region[1],
        region[2],
        'h' == o ? coh : region[3],
      ],
      [
        'v' == o ? cov : region[0],
        region[1],
        'h' == o ? coh : region[2],
        region[3],
      ],
    ];
  }
  if (3 == split) {
    let co = N(0.25) + 0.15,
      co2 = co + N(0.25) + 0.15,
      cov = co * (region[1] - region[0]) + region[0],
      coh = co * (region[3] - region[2]) + region[2],
      cov2 = co2 * (region[1] - region[0]) + region[0],
      coh2 = co2 * (region[3] - region[2]) + region[2];
    return [
      [
        region[0],
        'v' == o ? cov : region[1],
        region[2],
        'h' == o ? coh : region[3],
      ],
      [
        'v' == o ? cov : region[0],
        'v' == o ? cov2 : region[1],
        'h' == o ? coh : region[2],
        'h' == o ? coh2 : region[3],
      ],
      [
        'v' == o ? cov2 : region[0],
        region[1],
        'h' == o ? coh2 : region[2],
        region[3],
      ],
    ];
  }
  if (4 == split) {
    let co = N(0.2) + 0.15,
      co2 = co + N(0.2) + 0.15,
      co3 = co + N(0.2) + 0.15,
      cov = co * (region[1] - region[0]) + region[0],
      coh = co * (region[3] - region[2]) + region[2],
      cov2 = co2 * (region[1] - region[0]) + region[0],
      coh2 = co2 * (region[3] - region[2]) + region[2],
      cov3 = co3 * (region[1] - region[0]) + region[0],
      coh3 = co3 * (region[3] - region[2]) + region[2];
    return [
      [
        region[0],
        'v' == o ? cov : region[1],
        region[2],
        'h' == o ? coh : region[3],
      ],
      [
        'v' == o ? cov : region[0],
        'v' == o ? cov2 : region[1],
        'h' == o ? coh : region[2],
        'h' == o ? coh2 : region[3],
      ],
      [
        'v' == o ? cov2 : region[0],
        'v' == o ? cov3 : region[1],
        'h' == o ? coh2 : region[2],
        'h' == o ? coh3 : region[3],
      ],
      [
        'v' == o ? cov3 : region[0],
        region[1],
        'h' == o ? coh3 : region[2],
        region[3],
      ],
    ];
  }
}

let move = !1;
var imgSS = new Image();
let once = !0;

function draw() {
  background(255, 255, 255, 255), (l = graphics.length);
  let cw2 = s2 * cw,
    centerX = cw2 / 2,
    centerY,
    xx = mouseX,
    yy = mouseY;
  xx < 0 ? (xx = 0) : xx > cw2 && (xx = cw2),
    yy < 0 ? (yy = 0) : yy > cw2 && (yy = cw2);
  let diffXp = (xx - centerX) / cw2,
    diffYp = (yy - centerX) / cw2,
    offset = 50,
    layerP = [],
    snapshot;
  if (move) {
    for (let i in graphics) {
      let mult = i < l / 2 - 1 ? -1 : 1;
      layerP.push({
        x: mult * (Math.abs(l / 2 - i) / (l / 2)) * (cw2 / 50) * diffXp,
        y: mult * (Math.abs(l / 2 - i) / (l / 2)) * (cw2 / 50) * diffYp,
      });
    }
    for (let i in graphics) image(graphics[i], layerP[i].x, layerP[i].y);
  } else for (let i in graphics) image(graphics[i], 0, 0);
}

function mousePressed() {
  (mouseX = (s2 * cw) / 2), (mouseY = mouseX), (move = !move);
}

class scribble_gr {
  constructor(
    grIndex,
    points,
    cl,
    color,
    strokeWeight,
    shape,
    S = [0.1, 0.9, 0.1, 0.9],
  ) {
    (this.gri = grIndex),
      (this.points = points),
      (this.cl = cl),
      (this.color = color),
      (this.strokeWeight = strokeWeight),
      (this.Sh = shape),
      (this.S = S);
  }
  display() {
    graphics[this.gri].noFill(),
      graphics[this.gri].strokeWeight(Math.max(0.01, this.strokeWeight)),
      graphics[this.gri].stroke(this.color),
      graphics[this.gri].beginShape();
    for (let i = 0; i < this.points; i++) {
      let x = this.prevx
          ? N((cw * N(1)) / this.cl) + this.prevx - (cw * N(1)) / (2 * this.cl)
          : cw * N(1),
        y = this.prevy
          ? N((cw * N(1)) / this.cl) + this.prevy - (cw * N(1)) / (2 * this.cl)
          : cw * N(1),
        limit = 0;
      for (
        ;
        (x < cw * this.S[0] || x > cw * this.S[1]) &&
        ((x = this.prevx
          ? N((cw * N(1)) / this.cl) + this.prevx - (cw * N(1)) / (2 * this.cl)
          : cw * N(1)),
        limit++,
        !(limit > 100));

      );
      for (
        ;
        (y < cw * this.S[2] || y > cw * this.S[3]) &&
        ((y = this.prevy
          ? N((cw * N(1)) / this.cl) + this.prevy - (cw * N(1)) / (2 * this.cl)
          : cw * N(1)),
        limit++,
        !(limit > 100));

      );
      if (!(limit > 100)) {
        var isInShape = !1;
        for (let c in this.Sh)
          (('circles' == this.Sh[c].M &&
            inCircle(
              this.Sh[c].shape.h,
              this.Sh[c].shape.k,
              this.Sh[c].shape.r,
              x,
              y,
            )) ||
            ('PG' == this.Sh[c].M &&
              isInside(this.Sh[c].shape, this.Sh[c].shape.length, {
                x: x,
                y: y,
              })) ||
            ('positive-PG' == this.Sh[c].M &&
              !isInside(this.Sh[c].shape, this.Sh[c].shape.length, {
                x: x,
                y: y,
              })) ||
            ('block' == this.Sh[c].M && inBlock(this.Sh[c].shape, x, y)) ||
            ('parting' == this.Sh[c].M && inParting(this.Sh[c].shape, x, y)) ||
            ('alt-parting' == this.Sh[c].M &&
              inAltParting(this.Sh[c].shape, x, y)) ||
            ('area' == this.Sh[c].M && inArea(this.Sh[c].shape, x, y))) &&
            (isInShape = !0);
        isInShape ||
          (graphics[this.gri].curveVertex(x, y),
          (this.prevx = x),
          (this.prevy = y));
      }
    }
    graphics[this.gri].endShape();
  }
}

function getSh(type, x) {
  let Sh = [];
  if ('circles' == type) {
    let circleSize = Math.floor(N(7) + 4);
    for (let n = 0; n < x; n++)
      Sh.push({
        M: type,
        shape: {
          r: cw / circleSize,
          h: N(cw - cw / circleSize) + cw / circleSize,
          k: N(cw - cw / circleSize) + cw / circleSize,
        },
      });
  } else if ('PG' == type || 'positive-PG' == type)
    for (let i = 0; i < x; i++)
      Sh.push({M: type, shape: getPG(Math.ceil(N(8)) + 4)});
  else if ('parting' == type) {
    let pOrientation = N(1) > 0.5 ? 'vertical' : 'horizontal',
      sPart = N(0.15),
      maxPart = N(0.6) + 0.1 - sPart;
    Sh.push({M: pOrientation, partSize: sPart});
    for (let i = 0; i < x; i++) {
      let newPart = N(0.4 * maxPart);
      (maxPart -= newPart),
        Sh.push({M: type, shape: {M: pOrientation, size: sPart + newPart}}),
        (sPart += newPart);
    }
  } else if ('alt-parting' == type) {
    let pOrientation = N(100) > 50 ? 'vertical' : 'horizontal',
      sPart = N(0.15),
      maxPart = N(0.3) + 0.1 - sPart;
    Sh.push({M: pOrientation, partSize: sPart});
    for (let i = 0; i < x; i++) {
      let newPart = N(0.2 * maxPart) + 0.1 * maxPart;
      (maxPart -= newPart),
        Sh.push({
          M: type,
          shape: {
            M: pOrientation,
            size: sPart + newPart,
            location: N(0.5) + 0.25,
          },
        }),
        (sPart += newPart);
    }
  } else if ('block' == type)
    for (let i = 0; i < x; i++) {
      let o = N(1) > 0.5 ? 'vertical' : 'horizontal',
        s = N(1) > 0.5 ? 'start' : 'end',
        c = N(0.3) + 0.1;
      Sh.push({M: type, shape: {o: o, s: s, c: c}});
    }
  return Sh;
}

function inArea(area, x, y) {
  return (
    x > area[0] * cw && x < area[1] * cw && y > area[2] * cw && y < area[3] * cw
  );
}

function getPG(n, S) {
  let PG = [],
    wl = cw;
  if (S)
    for (let i = 0; i < n; i++)
      PG.push({
        x: N(wl * (S[1] - S[0])) + S[0] * wl,
        y: N(wl * (S[3] - S[2])) + S[2] * wl,
      });
  else
    for (let i = 0; i < n; i++)
      PG.push({x: N(0.8 * wl) + 0.1 * wl, y: N(0.8 * wl) + 0.1 * wl});
  let p = {x: PG[0].x, y: PG[0].y},
    q = p,
    min_x = PG[0].x,
    min_y = PG[0].y,
    max_x = PG[0].x,
    max_y = PG[0].y;
  for (let i in PG)
    p.x > PG[i].x && ((p = PG[i]), (min_x = PG[i].x)),
      q.x < PG[i].x && ((q = PG[i]), (max_x = PG[i].x)),
      min_y > PG[i].y && (min_y = PG[i].y),
      max_y < PG[i].y && (max_y = PG[i].y);
  let a = (q.y - p.y) / (q.x - p.x),
    b = q.y - a * q.x,
    upper = [],
    lower = [];
  for (let i in PG)
    PG[i].y >= a * PG[i].x + b ? upper.push(PG[i]) : lower.push(PG[i]);
  return (
    upper.sort((a, b) => a.x - b.x),
    lower.sort((a, b) => b.x - a.x),
    [...upper, ...lower]
  );
}

function inBlock(block, x, y) {
  let result = !1;
  return (
    'horizontal' == block.o
      ? 'start' == block.s
        ? y < block.c * S[2] * cw && (result = !0)
        : y > (1 - block.c) * S[3] * cw && (result = !0)
      : 'start' == block.s
      ? x < block.c * S[0] * cw && (result = !0)
      : x > (1 - block.c) * S[1] * cw && (result = !0),
    result
  );
}

function inCircle(h, k, r, x, y) {
  let a = x - h,
    b = y - k;
  return Math.pow(a, 2) + Math.pow(b, 2) <= Math.pow(r, 2);
}

function inSquare(square, x, y) {
  return (
    x > square.x &&
    x < square.x + square.size &&
    y > square.y &&
    y < square.y + square.size
  );
}

function inParting(parting, x, y) {
  if ('vertical' == parting.M) {
    let rx1 = cw / 2 - cw * (parting.size / 3),
      rx2 = cw / 2 + cw * (parting.size / 3);
    return x > rx1 && x < rx2;
  }
  {
    let ry1 = cw / 2 - cw * (parting.size / 3),
      ry2 = cw / 2 + cw * (parting.size / 3);
    return y > ry1 && y < ry2;
  }
}

function inAltParting(parting, x, y) {
  if ('vertical' == parting.M) {
    let rx1 = cw * parting.location - cw * (parting.size / 3),
      rx2 = cw * parting.location + cw * (parting.size / 3);
    return x > rx1 && x < rx2;
  }
  {
    let ry1 = cw * parting.location - cw * (parting.size / 3),
      ry2 = cw * parting.location + cw * (parting.size / 3);
    return y > ry1 && y < ry2;
  }
}

function onSegment(p, q, r) {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  );
}

function orientation(p, q, r) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  return 0 == val ? 0 : val > 0 ? 1 : 2;
}

function doIntersect(p1, q1, p2, q2) {
  let o1 = orientation(p1, q1, p2),
    o2 = orientation(p1, q1, q2),
    o3 = orientation(p2, q2, p1),
    o4 = orientation(p2, q2, q1);
  return (
    (o1 != o2 && o3 != o4) ||
    !(0 != o1 || !onSegment(p1, p2, q1)) ||
    !(0 != o2 || !onSegment(p1, q2, q1)) ||
    !(0 != o3 || !onSegment(p2, p1, q2)) ||
    !(0 != o4 || !onSegment(p2, q1, q2))
  );
}

function isInside(PG, n, p) {
  if (n < 3) return !1;
  let extreme = {x: cw, y: p.y},
    count = 0,
    i = 0;
  do {
    let next = (i + 1) % n;
    if (doIntersect(PG[i], PG[next], p, extreme)) {
      if (0 == orientation(PG[i], p, PG[next]))
        return onSegment(PG[i], p, PG[next]);
      count++;
    }
    i = next;
  } while (0 != i);
  return count % 2 == 1;
}

function getRandomColor(hsl, hn, sn, bn, an) {
  let h = parseInt(hsl[0] + N(hn) - hn / 2),
    s = parseInt(hsl[1] + N(sn) - sn / 2),
    b = parseInt(hsl[2] + N(bn) - bn / 2),
    a = s2 * parseInt(128 + N(an) - an / 2);
  return (
    (h = h < 0 ? (-1 * h) % 255 : h % 255),
    (s = s < 0 ? (-1 * s) % 255 : s % 255),
    (b = b < 0 ? (-1 * b) % 255 : b % 255),
    (a = a < 0 ? a + 200 : (a % 155) + 100),
    color(h, s, b, a)
  );
}

function getSomeElements(arr, n) {
  let array = [];
  for (let i = 0; i < n; i++) array.push(arr[Math.floor(N(arr.length - 1))]);
  return array;
}

function N(value) {
  return rnd() * value;
}

function rnd() {
  return (
    (seed ^= seed << 13),
    (seed ^= seed >> 17),
    (seed ^= seed << 5),
    ((seed < 0 ? 1 + ~seed : seed) % 1e3) / 1e3
  );
}
