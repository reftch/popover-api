OUTDIR=public

esbuild:
	npx -yes esbuild src/index.html src/index.ts src/styles.css \
  --bundle --watch \
  --outdir=${OUTDIR} --servedir=${OUTDIR} \
  --loader:.html=copy \
  --inject:src/livereload.ts

build:
	npx -yes esbuild src/index.html src/index.ts src/styles.css \
  	--bundle --minify --loader:.html=copy \
  	--outdir=${OUTDIR} 

prod:
	npx --yes http-server public -c-1
			
clean:
	rm -rf public/index.html public/index.js public/styles.css 			

dev:
	make -j1 esbuild