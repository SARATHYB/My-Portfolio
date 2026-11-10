document.addEventListener('DOMContentLoaded', initCosmicNetwork, { once: true });

function initCosmicNetwork() {
  const canvas = document.getElementById('cosmic-network-canvas');
  const network = canvas?.parentElement;
  const detail = document.getElementById('cosmic-network-detail');
  const detailType = document.getElementById('cosmic-network-type');
  const detailName = document.getElementById('cosmic-network-name');
  const detailDescription = document.getElementById('cosmic-network-description');

  if (!(canvas instanceof HTMLCanvasElement) || !network || !detail || !detailType || !detailName || !detailDescription) {
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to initialize the cosmic inspiration network canvas.');
  }

  const groups = [
    { name: 'Directors', color: '#79e8c0', items: ['Quentin Tarantino', 'Christopher Nolan', 'S.S. Rajamouli', 'James Cameron', 'Lokesh Kanagaraj', 'Anthony Russo', 'Prashanth Neel'] },
    { name: 'Movies', color: '#8ab7ff', items: ['Terminator', 'Pirates of the Caribbean', 'The Matrix', 'Reservoir Dogs', 'Cars', 'The Departed', 'Back to the Future', 'Marvel Movies', 'The Pursuit of Happyness', 'Baahubali', 'Master', 'Kaithi', 'Leo', 'KGF'] },
    { name: 'Books', color: '#c1a5ff', items: ['The Psychology of Money', 'Atomic Habits'] },
    { name: 'Anime', color: '#ff9fc9', items: ['Attack on Titan', 'Demon Slayer', 'Solo Leveling', 'Dr. Stone', 'Jujutsu Kaisen'] },
    { name: 'Actors', color: '#78dfff', items: ['Brad Pitt', 'Robert Downey Jr.', 'Vijay', 'Leonardo DiCaprio', 'Angelina Jolie', 'Scarlett Johansson', 'Tom Holland', 'Pooja Hegde'] },
    { name: 'Inspirational', color: '#ffd28a', items: ['Elon Musk', 'G.D. Naidu', 'A.P.J. Abdul Kalam', 'Ratan Tata', 'M.S. Dhoni'] },
    { name: 'Web Series', color: '#a9adff', items: ['Breaking Bad', 'The Mentalist', 'The Boys', 'Stranger Things', 'The Penguin', 'Loki', 'Game of Thrones'] }
  ];

  const descriptions = {
    'Quentin Tarantino': 'Known for nonlinear storytelling, sharp dialogue and bold cinema.',
    'Christopher Nolan': 'Creates ambitious films built around time, memory and reality.',
    'S.S. Rajamouli': 'Known for grand-scale Indian epics and spectacular storytelling.',
    'James Cameron': 'Blends groundbreaking visual effects with epic adventures.',
    'Lokesh Kanagaraj': 'Builds intense action stories and interconnected crime worlds.',
    'Anthony Russo': 'Directs large-scale ensemble stories, especially in the Marvel universe.',
    'Prashanth Neel': 'Known for gritty action, powerful heroes and larger-than-life worlds.',
    'Terminator': 'A sci-fi action saga about machines, survival and the future.',
    'Pirates of the Caribbean': 'A swashbuckling adventure filled with pirates and supernatural mysteries.',
    'The Matrix': 'A mind-bending sci-fi story questioning reality and control.',
    'Reservoir Dogs': 'A crime thriller known for tense dialogue and fractured storytelling.',
    'Cars': 'An animated journey about racing, friendship and finding purpose.',
    'The Departed': 'A tense crime thriller about undercover identities and betrayal.',
    'Back to the Future': 'A time-travel adventure packed with humour and memorable moments.',
    'Marvel Movies': 'A connected superhero universe of action, characters and epic conflicts.',
    'The Pursuit of Happyness': 'An inspiring story of persistence through hardship.',
    'Baahubali': 'A grand Indian epic of courage, legacy and royal conflict.',
    'Master': 'An action drama about a professor confronting a ruthless gangster.',
    'Kaithi': 'A gripping one-night action thriller driven by a father’s mission.',
    'Leo': 'A violent action thriller about identity and a mysterious past.',
    'KGF': 'A larger-than-life action saga about ambition, power and gold.',
    'The Psychology of Money': 'Explores how behaviour and emotions shape financial decisions.',
    'Atomic Habits': 'A practical guide to building good habits through small changes.',
    'Attack on Titan': 'A dark fantasy about freedom, survival and humanity’s secrets.',
    'Demon Slayer': 'A heartfelt action anime about family, courage and demons.',
    'Solo Leveling': 'A fantasy adventure about a hunter rising from weakness to power.',
    'Dr. Stone': 'Uses science and curiosity to rebuild civilisation from scratch.',
    'Jujutsu Kaisen': 'A supernatural action series about curses and sorcerers.',
    'Brad Pitt': 'Known for versatile roles across acclaimed dramas and thrillers.',
    'Robert Downey Jr.': 'A charismatic actor celebrated for reinvention and iconic roles.',
    'Vijay': 'A leading Tamil star known for energetic performances and mass appeal.',
    'Leonardo DiCaprio': 'Known for intense performances in acclaimed films.',
    'Angelina Jolie': 'An actor and filmmaker known for dramatic and action roles.',
    'Scarlett Johansson': 'A versatile actor across independent films and blockbusters.',
    'Tom Holland': 'Known for youthful energy and athletic superhero performances.',
    'Pooja Hegde': 'An actor appearing in major Indian film industries.',
    'Elon Musk': 'Entrepreneur associated with electric vehicles and space technology.',
    'G.D. Naidu': 'Indian inventor and industrialist celebrated for practical innovation.',
    'A.P.J. Abdul Kalam': 'Scientist and former president remembered for inspiring young minds.',
    'Ratan Tata': 'Industrialist remembered for leadership, philanthropy and humility.',
    'M.S. Dhoni': 'Cricket captain admired for calm leadership under pressure.',
    'Breaking Bad': 'A crime drama tracing a teacher’s transformation into a drug kingpin.',
    'The Mentalist': 'A sharp consultant uses observation to solve complex crimes.',
    'The Boys': 'A dark satire exploring superheroes, power and corruption.',
    'Stranger Things': 'A supernatural mystery about friendship and a hidden world.',
    'The Penguin': 'A crime saga following ambition in Gotham’s underworld.',
    'Loki': 'A time-bending Marvel series about identity and the multiverse.',
    'Game of Thrones': 'A fantasy epic of rival houses, power and political intrigue.'
  };

  const nodes = [];
  const links = [];
  const core = {
    id: 'core',
    name: 'SARATHY B',
    type: 'CORE',
    desc: 'The center of this inspiration network.',
    x: 0,
    y: 0,
    baseX: 0,
    baseY: 0,
    r: 27,
    phase: 0,
    color: '#72f0b0'
  };
  nodes.push(core);

  groups.forEach((group, groupIndex) => {
    const category = {
      id: `cat${groupIndex}`,
      name: group.name,
      type: 'CATEGORY',
      desc: `${group.items.length} interests in ${group.name.toLowerCase()}.`,
      group: groupIndex,
      r: 17,
      phase: groupIndex * 1.7,
      color: group.color
    };
    nodes.push(category);
    links.push([core, category]);

    group.items.forEach((name, itemIndex) => {
      const item = {
        id: `item${groupIndex}-${itemIndex}`,
        name,
        type: 'INTEREST',
        group: groupIndex,
        desc: descriptions[name] || `Part of the ${group.name} constellation.`,
        r: 10.5,
        phase: groupIndex * 2.1 + itemIndex * 0.83,
        color: '#78aaff'
      };
      nodes.push(item);
      links.push([category, item]);
    });
  });

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let pointer = { x: -9999, y: -9999 };
  let hovered = null;
  let selected = null;
  let focusedCategory = null;
  let keyboardNode = null;
  let currentFocusScale = 1;
  let mobileView = false;
  let layoutTransition = null;
  const startTime = performance.now();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function beginLayoutTransition() {
    if (reducedMotion) {
      return;
    }

    layoutTransition = {
      startedAt: performance.now(),
      fromScale: currentFocusScale,
      positions: new Map(nodes.map((node) => [
        node,
        {
          x: Number.isFinite(node.x) ? node.x : core.x,
          y: Number.isFinite(node.y) ? node.y : core.y
        }
      ]))
    };
  }

  function layout() {
    const centerX = width / 2;

    if (width < 700) {
      core.baseX = centerX;
      core.baseY = 0;

      if (focusedCategory) {
        const group = groups[focusedCategory.group];
        const rowCount = Math.ceil(group.items.length / 2);
        focusedCategory.baseX = centerX;
        focusedCategory.baseY = 230;

        groups.forEach((_, groupIndex) => {
          if (groupIndex === focusedCategory.group) {
            return;
          }

          const category = nodes.find((node) => node.id === `cat${groupIndex}`);
          category.baseX = width * (groupIndex + 1) / (groups.length + 1);
          category.baseY = 120;
        });

        group.items.forEach((_, itemIndex) => {
          const item = nodes.find((node) => node.id === `item${focusedCategory.group}-${itemIndex}`);
          item.baseX = width * (itemIndex % 2 === 0 ? 0.28 : 0.72);
          item.baseY = 325 + Math.floor(itemIndex / 2) * 88;
        });

        height = 420 + rowCount * 88;
      } else {
        groups.forEach((_, groupIndex) => {
          const category = nodes.find((node) => node.id === `cat${groupIndex}`);
          const row = Math.floor(groupIndex / 2);
          category.baseX = groupIndex === groups.length - 1
            ? centerX
            : width * (groupIndex % 2 === 0 ? 0.29 : 0.71);
          category.baseY = 130 + row * 122;
        });

        height = 130 + Math.ceil(groups.length / 2) * 122;
      }

      network.style.setProperty('--network-height', `${height}px`);
      return;
    }

    height = 900;
    network.style.setProperty('--network-height', `${height}px`);
    const centerY = height / 2 + 12;
    const compact = Math.min(width, height);
    const radiusX = Math.min(width * 0.17, compact * 0.22);
    const radiusY = Math.min(height * 0.17, compact * 0.22);
    core.baseX = centerX;
    core.baseY = centerY;

    groups.forEach((group, groupIndex) => {
      const category = nodes.find((node) => node.id === `cat${groupIndex}`);
      const angle = -Math.PI / 2 + groupIndex * 2 * Math.PI / groups.length;
      if (focusedCategory && category !== focusedCategory) {
        category.baseX = width * (groupIndex + 1) / (groups.length + 1);
        category.baseY = 112;
      } else {
        category.baseX = centerX + Math.cos(angle) * radiusX;
        category.baseY = centerY + Math.sin(angle) * radiusY;
      }

      const items = group.items.map((_, itemIndex) => nodes.find((node) => node.id === `item${groupIndex}-${itemIndex}`));
      const spread = items.length >= 12 ? 2.55 :
        items.length >= 8 ? 2.15 :
          items.length >= 6 ? 1.85 :
            items.length >= 4 ? 1.55 : 1.2;
      const baseRadius = Math.max(125, Math.min(205, compact * 0.235));

      items.forEach((item, itemIndex) => {
        const itemAngle = angle - spread / 2 + (items.length === 1 ? 0 : itemIndex / (items.length - 1) * spread);
        const itemRadius = baseRadius + (itemIndex % 2) * 42;
        item.baseX = category.baseX + Math.cos(itemAngle) * itemRadius;
        item.baseY = category.baseY + Math.sin(itemAngle) * itemRadius;
      });
    });
  }

  function resize() {
    width = network.getBoundingClientRect().width;
    layout();
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw(startTime, false);
  }

  function draw(time, scheduleNextFrame = true) {
    const elapsed = (time - startTime) / 1000;
    context.clearRect(0, 0, width, height);
    const transitionProgress = layoutTransition
      ? Math.min(1, (time - layoutTransition.startedAt) / 480)
      : 1;
    const transitionEase = 1 - (1 - transitionProgress) ** 3;

    nodes.forEach((node) => {
      const amplitude = node.type === 'CORE' ? 2.5 : node.type === 'CATEGORY' ? 4 : 5;
      const start = layoutTransition?.positions.get(node);
      const animatedX = start ? start.x + (node.baseX - start.x) * transitionEase : node.baseX;
      const animatedY = start ? start.y + (node.baseY - start.y) * transitionEase : node.baseY;
      node.x = animatedX + Math.sin(elapsed * 0.55 + node.phase) * amplitude;
      node.y = animatedY + Math.cos(elapsed * 0.48 + node.phase) * amplitude;
    });

    const mobile = width < 700;
    mobileView = mobile;
    const visibleNodes = focusedCategory
      ? [focusedCategory, ...nodes.filter((node) => node.type === 'INTEREST' && node.group === focusedCategory.group), ...nodes.filter((node) => node.type === 'CATEGORY' && node !== focusedCategory)]
      : mobile
        ? nodes.filter((node) => node.type === 'CATEGORY')
        : nodes;
    let focusScale = 1;

    if (focusedCategory && !mobile) {
      const focusedNodes = visibleNodes.filter((node) => node !== focusedCategory);
      const minX = Math.min(focusedCategory.x, ...focusedNodes.map((node) => node.x));
      const maxX = Math.max(focusedCategory.x, ...focusedNodes.map((node) => node.x));
      const minY = Math.min(focusedCategory.y, ...focusedNodes.map((node) => node.y));
      const maxY = Math.max(focusedCategory.y, ...focusedNodes.map((node) => node.y));
      const availableWidth = width * 0.82;
      const availableHeight = height * 0.76;
      focusScale = Math.min(1.55, availableWidth / (maxX - minX + 80), availableHeight / (maxY - minY + 80));
    }
    currentFocusScale = layoutTransition
      ? layoutTransition.fromScale + (focusScale - layoutTransition.fromScale) * transitionEase
      : focusScale;
    if (layoutTransition && transitionProgress === 1) {
      layoutTransition = null;
    }

    links.forEach(([from, to]) => {
      if (!visibleNodes.includes(from) || !visibleNodes.includes(to)) {
        return;
      }

      const fromX = getScreenX(from, focusScale, mobile);
      const fromY = getScreenY(from, focusScale, mobile);
      const toX = getScreenX(to, focusScale, mobile);
      const toY = getScreenY(to, focusScale, mobile);
      const active = !selected || selected === from || selected === to || from.group === selected.group || to.group === selected.group;
      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.strokeStyle = active ? 'rgba(133, 223, 255, 0.4)' : 'rgba(83, 104, 135, 0.1)';
      context.lineWidth = active ? 1.25 : 0.8;
      context.stroke();

      if (active) {
        const progress = (elapsed * 0.12 + (from.phase || 0) * 0.1) % 1;
        const x = fromX + (toX - fromX) * progress;
        const y = fromY + (toY - fromY) * progress;
        context.beginPath();
        context.arc(x, y, 1.5, 0, Math.PI * 2);
        context.fillStyle = '#b6f5ff';
        context.shadowBlur = 8;
        context.shadowColor = '#72dfff';
        context.fill();
        context.shadowBlur = 0;
      }
    });

    visibleNodes.forEach((node) => {
      const isHighlighted = node === hovered || node === selected;
      const nodeX = getScreenX(node, focusScale, mobile);
      const nodeY = getScreenY(node, focusScale, mobile);
      const unfocusedCategory = focusedCategory && node.type === 'CATEGORY' && node !== focusedCategory;
      const nodeScale = unfocusedCategory ? (mobile ? 0.62 : 0.8) : focusScale;
      const radius = node.r * nodeScale + (isHighlighted ? 3 : 0);
      context.globalAlpha = unfocusedCategory ? 0.8 : 1;
      const glow = context.createRadialGradient(nodeX, nodeY, 1, nodeX, nodeY, radius * 2.8);
      glow.addColorStop(0, `${node.color}55`);
      glow.addColorStop(1, `${node.color}00`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(nodeX, nodeY, radius * 2.8, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(nodeX, nodeY, radius, 0, Math.PI * 2);
      const fill = context.createRadialGradient(
        nodeX - radius * 0.35,
        nodeY - radius * 0.4,
        1,
        nodeX,
        nodeY,
        radius * 1.2
      );
      fill.addColorStop(0, '#ffffff');
      fill.addColorStop(0.18, node.color);
      fill.addColorStop(1, node.type === 'CORE' ? '#168f83' : '#254d94');
      context.fillStyle = fill;
      context.shadowBlur = isHighlighted ? 25 : 13;
      context.shadowColor = node.color;
      context.fill();
      context.shadowBlur = 0;
      context.lineWidth = 1.2;
      context.strokeStyle = `${node.color}cc`;
      context.stroke();
      context.globalAlpha = 1;

      if (node.type !== 'INTEREST' || focusedCategory) {
        const labelFontSize = unfocusedCategory ? (mobile ? 7 : 9) : mobile ? 10 : 11 * focusScale;
        const maxLabelWidth = unfocusedCategory ? width / (groups.length + 1) * 0.9 : width * (mobile ? 0.44 : 0.24);
        drawNodeLabel(node.name, nodeX, nodeY + radius + 9, labelFontSize, maxLabelWidth);
      }
    });

    if (hovered?.type === 'INTEREST' && !focusedCategory) {
      const nodeX = getScreenX(hovered, focusScale, mobile);
      const nodeY = getScreenY(hovered, focusScale, mobile);
      drawNodeLabel(hovered.name, nodeX, nodeY - 15, 12, Math.min(width - 28, 220));
    }

    function drawNodeLabel(text, x, y, fontSize, maxWidth) {
      context.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'top';
      context.fillStyle = '#eaf5ff';
      const words = text.split(/\s+/);
      const lines = [];
      let line = '';

      words.forEach((word) => {
        const nextLine = line ? `${line} ${word}` : word;
        if (line && context.measureText(nextLine).width > maxWidth) {
          lines.push(line);
          line = word;
        } else {
          line = nextLine;
        }
      });

      if (line) {
        lines.push(line);
      }

      const lineHeight = fontSize * 1.15;
      lines.forEach((label, index) => {
        context.fillText(label, x, y + index * lineHeight, maxWidth);
      });
    }

    if (!reducedMotion && scheduleNextFrame) {
      requestAnimationFrame(draw);
    }
  }

  function getScreenX(node) {
    if (focusedCategory && node.type === 'CATEGORY' && node !== focusedCategory) {
      return node.x;
    }

    if (focusedCategory && !mobileView) {
      return width / 2 + (node.x - focusedCategory.x) * currentFocusScale;
    }

    return node.x;
  }

  function getScreenY(node) {
    if (focusedCategory && node.type === 'CATEGORY' && node !== focusedCategory) {
      return node.y;
    }

    if (focusedCategory && !mobileView) {
      return height / 2 + (node.y - focusedCategory.y) * currentFocusScale;
    }

    return node.y;
  }

  function getVisibleNodes() {
    if (focusedCategory) {
      return [
        focusedCategory,
        ...nodes.filter((node) => node.type === 'INTEREST' && node.group === focusedCategory.group),
        ...nodes.filter((node) => node.type === 'CATEGORY' && node !== focusedCategory)
      ];
    }

    if (mobileView) {
      return nodes.filter((node) => node.type === 'CATEGORY');
    }

    return nodes;
  }

  function drawRoundRect(ctx, x, y, rectWidth, rectHeight, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, rectWidth, rectHeight, radius);
  }

  function pick(x, y) {
    let bestNode = null;
    let bestDistance = Infinity;

    const visibleNodes = getVisibleNodes();
    visibleNodes.forEach((node) => {
      const screenX = getScreenX(node);
      const screenY = getScreenY(node);
      const distance = Math.hypot(x - screenX, y - screenY);
      const radius = node.r * currentFocusScale;
      if (distance < radius + 9 && distance < bestDistance) {
        bestNode = node;
        bestDistance = distance;
      }
    });
    return bestNode;
  }

  function updateDetail(node, anchorToNode = false) {
    if (!node) {
      detail.hidden = true;
      detail.style.left = '';
      detail.style.top = '';
      detail.style.right = '';
      detail.style.bottom = '';
      return;
    }

    detailType.textContent = node.type === 'CORE' ? 'CORE' : node.type;
    detailName.textContent = node.name;
    detailDescription.textContent = node.desc;
    detail.style.left = '';
    detail.style.top = '';
    detail.style.right = '';
    detail.style.bottom = '';
    detail.hidden = false;

    if (anchorToNode) {
      const nodeX = getScreenX(node);
      const nodeY = getScreenY(node);
      const gap = node.r * currentFocusScale + 12;
      const cardWidth = detail.offsetWidth;
      const cardHeight = detail.offsetHeight;
      const left = nodeX + gap + cardWidth <= width - 8
        ? nodeX + gap
        : Math.max(8, nodeX - gap - cardWidth);
      const top = Math.max(8, Math.min(height - cardHeight - 8, nodeY - cardHeight / 2));
      detail.style.left = `${Math.max(8, Math.min(width - cardWidth - 8, left))}px`;
      detail.style.top = `${top}px`;
      detail.style.right = 'auto';
      detail.style.bottom = 'auto';
    }
  }

  function refreshLayout() {
    layout();
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    network.classList.toggle('is-focused', Boolean(focusedCategory));
    if (reducedMotion) {
      draw(performance.now(), false);
    }
  }

  function selectNode(node) {
    if (node?.type === 'CATEGORY') {
      beginLayoutTransition();
      focusedCategory = focusedCategory === node ? null : node;
      selected = focusedCategory;
      hovered = null;
      keyboardNode = focusedCategory;
      refreshLayout();
      updateDetail(focusedCategory);
      return;
    }

    if (node) {
      selected = node;
      hovered = node;
      keyboardNode = node;
      updateDetail(node);
      return;
    }

    selected = null;
    hovered = null;
    updateDetail(focusedCategory);
  }

  canvas.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    hovered = pick(pointer.x, pointer.y);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
    updateDetail(hovered || selected, Boolean(hovered));
  });

  canvas.addEventListener('pointerleave', () => {
    hovered = null;
    canvas.style.cursor = 'default';
    updateDetail(selected);
  });

  canvas.addEventListener('click', (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    selectNode(pick(pointer.x, pointer.y));
  });

  canvas.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      beginLayoutTransition();
      focusedCategory = null;
      selected = null;
      hovered = null;
      keyboardNode = null;
      refreshLayout();
      updateDetail(null);
      return;
    }

    if (event.key === 'Enter' && (keyboardNode || hovered)) {
      event.preventDefault();
      selectNode(keyboardNode || hovered);
      return;
    }

    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const navigableNodes = getVisibleNodes();
    const currentIndex = keyboardNode ? navigableNodes.indexOf(keyboardNode) : -1;
    const nextIndex = event.key === 'Home' ? 0 :
      event.key === 'End' ? navigableNodes.length - 1 :
        (currentIndex + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + navigableNodes.length) % navigableNodes.length;
    keyboardNode = navigableNodes[nextIndex];
    hovered = keyboardNode;
    updateDetail(keyboardNode);
  });

  window.addEventListener('resize', resize);
  resize();
  if (!reducedMotion) {
    requestAnimationFrame(draw);
  }
}
