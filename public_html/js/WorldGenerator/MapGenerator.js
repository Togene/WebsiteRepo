 
   function MapGenerator (octaves, persistance, lacunarity, seed, noiseScale, offset, size)
    {
        var noiseMap = GenerateNoiseMap(size, size, seed, noiseScale, octaves, persistance, lacunarity, offset);
        var falloffMap = GenerateFalloffMap(size);
        var colorMap = new Array();
        var clampedMap = new Array();

        for(var x = 0; x < size; x++)
         {
              clampedMap[x] = new Array();

            for(var y = 0; y < size; y++)
            {
                clampedMap[x][y] = 0;
            }
        }

        for(var y = 0; y < size; y++)
        {
            for(var x = 0; x < size; x++)
            {
                clampedMap[x][y] = Clamp(noiseMap[x][y] - falloffMap[x][y], 0, 1);
                //clampedMap[x, y] = (noiseMap[x][y]);
            }
        }

        for(var y = 0; y < size; y++)
        {
            for(var x = 0; x < size; x++)
            {
                var currentHeight = clampedMap[x][y];
          
                for(var i = 0; i < regions.length; i++)
                {
                   
                    if(currentHeight >= regions[i].height)
                    {
                        colorMap[y * size + x] = regions[i].color;     
                    }
                    else
                    {   
                        break;
                    }
                }
            }
        }
        
        var finalmap = new Array(colorMap.length * 3);
 
        for(var i = 0; i < finalmap.length; i+=3)
            {

                finalmap[i] =      colorMap[i / 3].r;
                finalmap[i + 1] =  colorMap[i / 3].g;
                finalmap[i + 2] =  colorMap[i / 3].b;

            } 

       return finalmap;
    };

function TerrainType(name, height, color)
{
	 this.name = name;
	 this.height = height;
     this.color = color;
};


function Clamp (value, min, max) 
{
  return Math.min(Math.max(value, min), max);
};